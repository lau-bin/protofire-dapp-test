// prebuild configuration, used to move/clean files/resources in build dir before webpack runs
module.exports = {
    APP_ROOT: __dirname, //Current dir full path in node
    BUILD_DIR: "dist",
    KEEP_FILES: [
    ],
    MOVE_FILES: [
        ["src/index.html", ""]
    ],
    MOVE_FILES_DEV:[
    ]
}