const core=require('@actions/core');
const github=require('@actions/github');
const exec = require('@actions/exec');

const glob = require('@actions/glob');

const io = require('@actions/io');

try{
    const nameToGreet=core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}`);
    const time=(new Date()).toTimeString();
    core.setOutput("time", time)
    const payload=JSON.stringify(github.context.payload,undefined,2);
    console.log(`The event payload: ${payload}`);

    // https://github.com/v-stache/hello-world-javascript-action/runs/667007467?check_suite_focus=true
    console.log("================export variable================")
    core.exportVariable('envVar', 'Val');
    console.log("================mask ================")
    core.setSecret('myPassword');
    console.log("test password myPassword, mypassword, myPasswordtest, mypasswordtest2");
    console.log("======================add path=====================");
    core.addPath('/path/to/mytool');

    console.log("Environment variables================================");
    console.log(process.env);
    try{ 
        console.log("==============Logging================================");
        core.warning('myInput was not set');
        if (core.isDebug()){
            console.log("==========this is debug log=============");
        }
        else{
            console.log("debug not enabled");
        }
    }catch(err){
        core.error(`Error ${err}`);
    }
    console.log("======================action state=====================");
    core.saveState("pidToKill", 12345);
    console.log("======================actions/exec=====================");
    asyncExec();

    console.log("======================actions/glob=====================");
    asyncGlob();

    console.log("====================@actions/io=======================");
}
catch(error)
{
    core.setFailed(error.message);
}
async function asyncExec() {
    
    await exec.exec('node', ['test.js', 'foo=bar']);
}
async function asyncGlob(){
    // https://github.com/v-stache/hello-world-javascript-action/runs/667135669?check_suite_focus=true
    const patterns = ['**/*.js', '**/*.json'];
    const globber2 = await glob.create(patterns.join('\n'));
    const files = await globber2.glob();
    console.log(files);
}
async function copyFile(){
    await io.mkdirP('folder1');
    await io.mv('README.md', 'folder1/README.md');
}
