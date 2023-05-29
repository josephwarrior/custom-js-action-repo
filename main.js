const core = require('@actions/core')
const exec = require('@actions/exec')

function run() {
    const bucket = core.getInput('bucket', {required: true})
    const region = core.getInput('region', {required: true})
    const folder = core.getInput('folder', {required: true})

    const s3uri = `s3://${bucket}`
    exec.exec(`aws s3 sync ${folder} ${s3uri} --region ${region}`)
        .then(() => {
            core.setOutput('site-url',`http://${bucket}.s3-website-${region}.amazonaws.com`)
            core.notice("this custom javascript action sent an artifact to s3 bucket")
        })
}

run()