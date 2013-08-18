#!/usr/bin/env node

var options = {
    port: 3000,
    lport: 35729,
    exclusions: [],
    dir: '.'
};

var livereload = require('better-livereload'),
    connect_livereload = require('connect-livereload'),
    connect = require('connect');

function init(opts) {
    for (var o in opts) {
        options[o] = opts[o];
    }

    options.listen = options.port;
    options.port = options.lport;
    delete options.lport;
    options.applyJSLive = options.livejs;
    delete options.livejs;
    options.applyCSSLive = options.livecss;
    delete options.livecss;

    var d = options.dir;
    if (d[0] !== '/') {
        d = process.cwd() + '/' + d;
    }

    var server = livereload.createServer(options);
    server.watch(d);

    var middleware = connect_livereload({
        port: options.port,
        excludeList: options.exclusions
    });

    var app = connect.createServer()
        .use(middleware)
        .use(connect.static(d))
        .listen(options.listen);

    console.log('Listening at http://localhost:'+options.listen);
}

module.exports = init;

if (!module.parent) {
    var noptify = require('noptify');

    var program = noptify(process.argv, { program: 'livereloader' })
        .version('0.0.1')
        .option('port', '-p', 'Serving files on this port (default: 3000)', Number)
        .option('lport', '-l', 'Livereload server on this port (default: 35729)', Number)
        .option('dir', '-d', 'Directory to serve files from (default current working directory)', String)
        .option('exts', '-e', 'List of extensions you want to observe', Array)
        .option('exclusions', '-E', 'List of files to ignore', Array)
        .option('livecss', 'Reload CSS files without refreshing the page (default: true)', Boolean)
        .option('livejs', 'Reload JavaScript files without refresing the page (default: false)', Boolean);

    var opts = program.parse();

    init(opts);
}