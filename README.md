# Portal
Frontend Administration based on Angular admin dashboard framework (ng2-admin) [http://akveo.com/ng2-admin]()

### Development
Run DEV mode from the `ng2-admin` directory:

```
npm start
```

Then point your browser to:
```
http://localhost:2999/
```

While in DEV mode, all updates to (*.ts, *.scss, etc..) files under the `src` directory will cause Webpack Dev Server to compile the changes and reload the app.


### Production
Compile PROD distribution from the `ng2-admin` directory:

```
npm run build:prod
```

The `build:prod` command erases the contents of the `dist` directory and compiles the newly built app in there.
