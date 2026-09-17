const {run}=require('./browser-helper.cjs'),assert=require('node:assert/strict'),fs=require('fs');const results=[];
const cases={
cryptkit:['password-entropy-strength-checker',async p=>{await p.locator('#password-input').fill('abcdefgh');assert.match(await p.locator('#password-result').innerText(),/37.60/);await p.locator('#password-generate').press('Enter');assert.equal((await p.locator('#password-input').inputValue()).length,20);await p.locator('#password-input').fill('');assert.equal(await p.locator('#password-result').innerText(),'');}],
};
(async()=>{for(const [site,[slug,test]] of Object.entries(cases)){await run(site,async(p,url,errors)=>{for(const lang of ['','zh/','de/','es/','fr/','ja/','pt/']){await p.goto(url+'/'+lang+slug);await test(p);results.push({site,lang,status:'passed'});}assert.deepEqual(errors,[]);});console.log(site,'passed');}})().catch(e=>{console.error(e);process.exitCode=1});
