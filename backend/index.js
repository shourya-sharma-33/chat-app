import express from "express";
import env from 'dotenv';

function appRunCallback () {
    console.log(`Server Start on ${process.env.BACKEND_PORT}`);
}


function main(){
    const app = express();
    app.listen(5000, () => {
        appRunCallback();
    })
}

main();
