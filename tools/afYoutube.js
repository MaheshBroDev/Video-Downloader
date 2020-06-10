const spawn = require("child_process").spawn;

module.exports = class afYoutube {
    constructor( bin_path ) {
        this.setBinaryPath( bin_path || 'youtube-dl');
        this.funcs = {};
        this.args = [];
        this.proc = null;
    }

    /**
     * Setup the binary path
     * @param {string} path 
     */
    setBinaryPath( path ) {
        this.binary_path = path;
    }

    getBinaryPath() {
        return this.binary_path;
    }


    on(event, fun) {
        this.funcs[event] = fun;
    }

    defineArgs( args ) {
        this.args = args || [];
    }

    download( url ) {
        this.url = url;
        let m_arg = this.args;
        m_arg.push( url );

        this.proc = spawn(this.getBinaryPath(), m_arg);
        let proc = this.proc;
        if ( this.funcs.data ) {
            proc.stdout.on('data', this.funcs.data );
            proc.stderr.on('data', this.funcs.data );
        }
        if ( this.funcs.error )
            proc.on('error', this.funcs.error);
        if ( this.funcs.exit )
            proc.on('exit', this.funcs.exit);
    }

    stop() {
        if ( this.proc != null ) this.proc.kill();
    }
}