#! /usr/bin/env node

import fs from "fs"
import archiver from "archiver"

const cwd = process.cwd()

const manifest = fs.readFileSync(`${cwd}/src/manifest.json`, "utf8")
if (!manifest) {
    console.warn("No manifest file found")
    process.exit(1)
}
console.info(`manifest file found`)

const appId = manifest.match(/__UNI__[a-zA-Z_\d]+/)
if (!appId) {
    console.warn("No appid found in manifest")
    process.exit(1)
}
console.info(`appId: ${appId[0]}`)

const devDir = `${cwd}/dist/dev`
const buildDir = `${cwd}/dist/build`
const devAppDir = `${cwd}/dist/dev/app`
const buildAppDir = `${cwd}/dist/build/app`
const devAppPlusDir = `${cwd}/dist/dev/app-plus`
const buildAppPlusDir = `${cwd}/dist/build/app-plus`
let existedDirs = []

let isDevDirFound = false
let isBuildDirFound = false
if (!fs.existsSync(devDir)) {
    console.warn(`❌ .${devDir.split(cwd)[1]} not found`)
} else {
    isDevDirFound = true
    console.info(`✅ .${devDir.split(cwd)[1]} found`)
}

if (!fs.existsSync(buildDir)) {
    console.warn(`❌ .${buildDir.split(cwd)[1]} not found`)
} else {
    isBuildDirFound = true
    console.info(`✅ .${buildDir.split(cwd)[1]} found`)
}

if (!isDevDirFound && !isBuildDirFound) {
    console.warn(`No existed dirs found`)
    process.exit(1)
}

if (!fs.existsSync(devAppDir)) {
    console.warn(`❌ .${devAppDir.split(cwd)[1]} not found`)
} else {
    console.info(`✅ .${devAppDir.split(cwd)[1]} found`)
    existedDirs.push(devAppDir)
}

if (!fs.existsSync(buildAppDir)) {
    console.warn(`❌ .${buildAppDir.split(cwd)[1]} not found`)
} else {
    console.info(`✅ .${buildAppDir.split(cwd)[1]} found`)
    existedDirs.push(buildAppDir)
}

if (!fs.existsSync(devAppPlusDir)) {
    console.warn(`❌ .${devAppPlusDir.split(cwd)[1]} not found`)
} else {
    console.info(`✅ .${devAppPlusDir.split(cwd)[1]} found`)
    existedDirs.push(devAppPlusDir)
}

if (!fs.existsSync(buildAppPlusDir)) {
    console.warn(`❌ .${buildAppPlusDir.split(cwd)[1]} not found`)
} else {
    console.info(`✅ .${buildAppPlusDir.split(cwd)[1]} found`)
    existedDirs.push(buildAppPlusDir)
}

console.info(`existedDirs: \n${existedDirs.join(", \n")}`)

if (existedDirs.length === 0) {
    console.warn("No existed dirs found")
    process.exit(1)
}

existedDirs.forEach(dir => {
    console.info(`packing dir: ${dir}`)

    const dirName = dir.split("/").pop()
    const dirPath = dir.split("/").slice(0, -1).join("/")
    const outputTargetDir = `${dirPath}/${dirName}_wgt`
    if (!fs.existsSync(outputTargetDir)) {
        fs.mkdirSync(outputTargetDir)
        console.info(`create dir: ${outputTargetDir}`)
    } else {
        // delete existed files
        const files = fs.readdirSync(outputTargetDir)
        files.forEach(file => {
            fs.unlinkSync(`${outputTargetDir}/${file}`)
            console.info(`delete file: ${outputTargetDir}/${file}`)
        })
    }
    const output = fs.createWriteStream(`${outputTargetDir}/${appId}.wgt`)
    const archive = archiver("zip")

    output.on("close", () => {
        console.info(`packaging done: ${outputTargetDir}/${appId}.wgt   ${archive.pointer()} total bytes`)
    })

    archive.on("warning", (err) => {
        if (err.code === "ENOENT") {
            console.log(err)
        } else {
            throw err
        }
    })

    archive.on("error", (err) => {
        console.error(err)
        throw err
    })

    archive.pipe(output)

    archive.directory(`${dir}/`, false)

    archive.finalize()

})






