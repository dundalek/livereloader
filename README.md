
# Livereloader

Simple HTTP server with livereload functionality. No setup, other apps or browser extensions required.

## Install

```
npm install -g livereloader
```

## Usage

```
cd /path/to/project
livereloader
```

Then open your browser `http://localhost:3000`. Edit project files and the browser will automatically reloads on change.

## Options
```
    -h, --help                  - Show help usage
    -v, --version               - Show package version
    -p, --port                  - Serving files on this port (default: 3000)
    -l, --lport                 - Livereload server on this port (default: 35729)
    -d, --dir                   - Directory to serve files from (default current working directory)
    -e, --exts                  - List of extensions you want to observe
    -E, --exclusions            - List of files to ignore
    --livecss                   - Reload CSS files without refreshing the page (default: true)
    --livejs                    - Reload JavaScript files without refresing the page (default: false)
```

## Details

Based on [better-livereload](https://github.com/Leftium/node-livereload) and [connect-livereload](https://github.com/intesso/connect-livereload).