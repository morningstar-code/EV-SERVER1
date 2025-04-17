

RPC.register("ev-skills:server:adjustSkill", async(pSource,pType, value, state) => {
    let src = source
    let info = exports['ev-lib'].getCharacter(src)
    let cid = info.id
    exports.oxmysql.execute("SELECT * FROM progression WHERE cid = @cid", {["cid"] : Number(cid)}, async(result) => {
        if (result[0] != null) {
            let skills = json.decode(result[1].skills)
            let currentVal = skills[pType]
            if (state == "add") {
                skills[pType] = currentVal + value
                print(skills[pType], "add")
                exports.oxmysql.execute("UPDATE progression SET `skills` = @skills WHERE `cid` = @id", {
                    ['@skills'] : JSON.stringify(skills),
                    ['@id'] : cid
                })
            } else if (state == "remove") {
                skills[pType] = currentVal - value
                exports.oxmysql.execute("UPDATE progression SET `skills` = @skills WHERE `cid` = @id", {
                    ['@skills']: JSON.stringify(skills),
                    ['@id']: cid
                })
            }
        }
    })
})

RPC.register("ev-skills:server:getPlayerSkills", async() => {
    let src = source
    let info = exports['ev-lib'].getCharacter(src)
    let cid = info.id
    exports.oxmysql.execute("SELECT * FROM progression WHERE cid = @cid", {["cid"] : Number(cid)}, async(result) => {
        if (result[0] != null) {
            let skills = json.decode(result[1].skills)
           return skills
        }
    })
})

onNet("ev-skills:server:adjustSkill", async(pSource,pType, value, state) => {
    let src = source
    let info = exports['ev-lib'].getCharacter(src)
    let cid = info.id
    exports.oxmysql.execute("SELECT * FROM progression WHERE cid = @cid", {["cid"] : Number(cid)}, async(result) => {
        if (result[0] != null) {
            let skills = json.decode(result[1].skills)
            let currentVal = skills[pType]
            if (state == "add") {
                skills[pType] = currentVal + value
                print(skills[pType], "add")
                exports.oxmysql.execute("UPDATE progression SET `skills` = @skills WHERE `cid` = @id", {
                    ['@skills'] : JSON.stringify(skills),
                    ['@id'] : cid
                })
            } else {
                skills[pType] = currentVal - value
                exports.oxmysql.execute("UPDATE progression SET `skills` = @skills WHERE `cid` = @id", {
                    ['@skills']: JSON.stringify(skills),
                    ['@id']: cid
                })
            }
        }
    })
})