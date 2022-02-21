import { appendFileSync, unlinkSync } from "fs"

const fileName = "./mock/students.csv"
const content = "学号,姓名,电话号码,组织\n"

unlinkSync(fileName)

const id = () => {
    let _id = 1238400000
    return () => _id++
}

const name = () => {
    let _name = 0x1200
    return () => {
        _name++
        return decodeUnicode("\\u" + _name + "\\u" + _name + "\\u" + _name)
    }
}
const tel = () => {
    let _tel = 19923890000
    return () => _tel++
}
const org = "23级美声"

appendFileSync(fileName, content)

const g_id = id()
const g_name = name()
const g_tel = tel()

for (let i = 0; i < 500; i++) {
    const row = `${g_id()},${g_name()},${g_tel()},${org}\n`
    appendFileSync(fileName, row)
}

function decodeUnicode(str) {
    str = str.replace(/\\/g, "%")
    return unescape(str)
}
