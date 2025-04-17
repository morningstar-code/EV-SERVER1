fx_version("cerulean")
game("gta5")
lua54("yes")
this_is_a_map("yes")

client_script({
	"apartments_entitysets.lua",
})

dependencies({
	"/server:5181",
	"/gameBuild:2699",
	"np-littleseoul",
	"np-djewel",
})

escrow_ignore({
	"apartments_entitysets.lua",
})
dependency("/assetpacks")
