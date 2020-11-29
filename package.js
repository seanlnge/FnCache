const fetch = require('node-fetch');
const fs = require('fs');
const { dirname } = require('path');

function createFolder(){
    return new Promise(resolve => {
        fs.mkdir('./fncache', (err) => {
            if(err) throw err;

            fs.writeFile('./fncache/all.js', 'module.exports = {};', (err) => {
                if(err) throw err;
                resolve();
            });
        });
    });
}

// Main setup function

/**
 * @param {String} fileName Name of current running Node.js file
 * @param {String} varName Name of variable assigned to FnCache package
 */
async function functions(fileName, varName){

    if(!varName) varName = 0;

    // Read lines of code to find functions
    let URL = './fncache/all.js';
    let code = fs.readFileSync(fileName, { encoding: 'utf-8' });
    code = code.replace(/\n|\r/g, '');

    // Check to find if all needed folders/files exist
    let exists =  fs.existsSync('./fncache');
    if(!exists) await createFolder();
    let fexists = fs.existsSync(URL);
    if(!fexists) fs.writeFileSync(URL, 'module.exports = {};');
    
    // Loop over code in file and take things to download
    let funcSplit = code.split('fn.').slice(1);
    let funcs = [];


    // Loop over all funcs
    for(let func of funcSplit){

        // Split code into characters
        let name = '';
        let add = true;

        // Loop over characters
        for(let i=0; i<func.length; i++){
            
            // If calling function
            if(func[i] == '('){
                funcs.push(name);

            // If alphanumeric
            } else if(func[i].match(/^[0-9a-zA-Z]+$/)){
                name += func[i];
            
            // If not true break
            } else {
                add = false;
                break;
            }
        }

        // Add to function line
        if(add) funcs.push(func.split('(')[0]);
    }


    // Loop over functions
    let proper = __dirname.replace(/\\/g, '/').split('/').slice(0, -3).join('/') + '/fncache/all';
    let priorFns = require(proper);

    for(let i=0; i<funcs.length; i++){
        
        // Remove duplicates
        let shouldBreak = false;
        for(let j=i+1; j<funcs.length; j++){
            if(funcs[i] == funcs[j]){ shouldBreak = true; break; }
        }
        if(shouldBreak) continue;

        let func = funcs[i];
        if(func === 'set') continue;

        // Check if function exists in folder
        if(priorFns[func]){
            functions[func] = priorFns[func];
            continue;
        }

        // Get code for function and put into dir
        let code = await fetchCode(func);

        // Add code to module.exports
        let prev = fs.readFileSync(URL, { encoding: 'utf-8' });
        let last = prev.split('\n').slice(-1)[0];
        

        // Create module.exports line
        let part1 = 'module.exports = {' + func;
        let part2 = last.split('{')[1][0] == '}' ? '' : ', ';
        let part3 = last.split('{')[1];
        last = part1 + part2 + part3;

        // Add to file and set function to file func
        prev = prev.split('\n').slice(0, -1);
        prev.push(last);
        prev = prev.join('\n');
        fs.writeFileSync(URL, `${code}\n\n${prev}`);


        // Use eval to write functions for code run
        code = code.trim();
        let insides = code.split('{').slice(1).join('{').split('}').slice(0, -1).join('}');
        let params = '';
        let async = code.split(' ')[0] == 'async' ? 'async' : '';

        // Loop through to find params
        let val = 1;
        for(let char of code.split('(').slice(1).join('(')){
            if(char == '(') val++;
            if(char == ')') val--;
            if(val === 0) break;

            params += char;
        }

        // Evaluate function
        eval(`functions.${func} = ${async}(${params}) => {
            ${insides}
        }`)
    }

    /**
     * @param {String} name What should this function be called
     * @param {Function} func Function object name
     * @param {Function?} callback Run after completed (err, data)
     */
    functions.set = async(name, func, description, callback) => {
        let data = await fetch('https://Code-Jam-10.spicedspices.repl.co/create/js/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'   
            },
            body: JSON.stringify({
                func: name,
                code: func.toString(),
                description: description
            })
        }).then(res => res.json());

        if(callback){
            callback(data.error, data);
        } else {
            if(data.error) throw data.error;
            return data;
        }

    }
}




// Fetch a function from server
async function fetchCode(name){

    // Send request to server
    let data = await fetch(
        'https://Code-Jam-10.spicedspices.repl.co/function/js/' + name
    ).then(res => res.json());

    // Return code for file
    if(data.status == 200){
        return data.code;
    }

}

module.exports = functions;
