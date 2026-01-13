import app from './app.js';
import db from './models/index.js';


db.sequelize.sync().then(() => {
    console.log("Baza de date a fost sincronizata");

    app.listen(3001,() => {
        console.log("Running a graphql server at port 3001");
    });
}).catch((err)=>{
    console.error("Eroare la sincronizarea bazei de date!",err);
});

// app.listen(3001, () => {
//     console.log("Running a graphql server at port 3001");
// });

// export default app;
