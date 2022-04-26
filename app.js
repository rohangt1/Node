
const express = require('express')
const app = express()
const { JavaCaller } = require("java-caller");
const bodyParser = require('body-parser')
const Ftp = require( 'ftp' );
app.use(bodyParser.json())
app.get("/test", (req, res) => {
    res.send("running")
})
app.get("/test1", (req, res) => {
    //res.send("running")
    const exec = require('child_process').exec;
    const childPorcess = exec('java -jar NodeAppProject.jar "Jar is invoked by Node js"', function(err, stdout, stderr) {
    if (err) {
        //console.log(err)
        res.send(err)
    }
    //console.log(stdout)
    res.send(stdout)
    })
})
// Run asynchronously to use the returned status for process.exit
app.get("/", (req, res) => {
    (async () => {
        try {
            //await runExample();
            const java = new JavaCaller({
            classPath: 'NodeAppProject.jar', // CLASSPATH referencing the package embedded jar files
            mainClass: 'nodeappproject.NodeAppProject',// Main class to call, must be available from CLASSPATH,
            rootPath: __dirname,
        });
        const { status, stdout, stderr } = await java.run();
        //console.log(stdout);
        res.send(stdout);
        } catch (err) {
            console.error("Unexpected error: " + err.message + "\n" + err.stack);
            process.exitCode = 1;
        }
    })();
})

app.get("/big", (req, res) => {
    (async () => {
        try {
            //await runExample();
            const java = new JavaCaller({
            classPath: 'WordFileMgtNodeJS.jar', // CLASSPATH referencing the package embedded jar files
            mainClass: 'wordfilemgtnodejs.WordFileMgtNodeJS',// Main class to call, must be available from CLASSPATH,
            rootPath: __dirname,
        });
        const { status, stdout, stderr } = await java.run();
        console.log(stdout);
        res.send(stdout);
        } catch (err) {
            console.error("Unexpected error: " + err.message + "\n" + err.stack);
            process.exitCode = 1;
        }
    })();
})

// Example function
async function runExample() {
    const java = new JavaCaller({
        classPath: 'NodeAppProject.jar', // CLASSPATH referencing the package embedded jar files
        mainClass: 'nodeappproject.NodeAppProject',// Main class to call, must be available from CLASSPATH,
        rootPath: __dirname,
    });
    const { status, stdout, stderr } = await java.run();
    console.log(stdout);
}
app.post("/11", (req, res) => {
    const fs = require('fs');

    (async () => {
        try {
            //await runExample();
            const java = new JavaCaller({
            classPath: 'AuditSoftMCQFillProject.jar', // CLASSPATH referencing the package embedded jar files
            mainClass: 'auditsoftmcqfillproject.AuditSoftMCQFillProject',// Main class to call, must be available from CLASSPATH,
            rootPath: __dirname,
        });
        const { status, stdout, stderr } = await java.run(['abc', req.body['args']]);
        //console.log(stdout);
        //res.send(stdout);
        fs.readFile('application_doc.pdf', function(err, buffer){
            const ftpClient = new Ftp();
            //console.log(req.file);
            ftpClient.on( 'ready', function() {
                    ftpClient.put( buffer, '/public_html/temp_files/app_doc.pdf', function( err, list ) {
                    if ( err ) throw err;
                    ftpClient.end();
                    res.send('done');
                });
            });
            
            ftpClient.connect( {
                'host': 'ftp.cwac.in',
                'user': 'cwacin',
                'password': '$Rv01111996'
            } );
        })
        } catch (err) {
            console.error("Unexpected error: " + err.message + "\n" + err.stack);
            process.exitCode = 1;
        }
    })();
})
app.listen(process.env.PORT || 5000, () => {
    console.log("listening")
})