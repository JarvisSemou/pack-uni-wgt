# pack uniapp wgt

将 uniapp 编译后的 app、app-plus 目录内容打包成 wgt 文件

## 安装

```shell
    yarn add pack-uni-wgt -D
```

或

```shell
    npm install pack-uni-wgt -d
```

## 使用

1. 先对小程序代码进行编译

    ```shell
        yarn dev:app            # 调试版本
        yarn build:app          # 正式版本

        yarn dev:app-plus       # 调试版本(假设存在)
        yarn build:app-plus     # 正式版本(假设存在)
    ```

    或

    ```shell
        npm run dev:app            # 调试版本
        npm run build:app          # 正式版本

        npm run dev:app-plus       # 调试版本(假设存在)
        npm run build:app-plus     # 正式版本(假设存在)
    ```

2. 执行打包命令  

    ```shell
        yarn run pack-uni-wgt
    ```

    或

    ```shell
        npm exec pack-uni-wgt
        npx pack-uni-wgt            # npx 是 npm run 的替代
    ```

    打包命令 `pack-uni-wgt` 可以简写为 `puw` ,例如: `yarn run puw`.

    打包结果将输出到 `dist/dev` 或 `dist/build` 目录下的以 `_wgt` 结尾的目录中,例如: `dist/build/app_wgt`.

    可以通过配置 `package.json` 文件的 [script](https://docs.npmjs.com/cli/v10/using-npm/scripts) 属性实现贬义后自动打包, 例如: `"postbuild:app": "puw"`.
