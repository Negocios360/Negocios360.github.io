const {Router} = require('express');
const admin = require('firebase-admin');
const app = Router();

admin.initializeApp({
    credential: admin.credential.cert('./permissions.json'),
})

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

//Users
app.get('/showUsers', async(req, res) => {
    try{
        const query = db.collection('users');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            name: doc.data().name,
            teamId: doc.data().teamId,
            password: doc.data().password,
        }));

        return res.status(200).json(response);
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}),

//My profile
app.get('/myProfile/:email/:password', async(req, res) => {
    try{
        const query = db.collection('users')
            .where("email", "==", req.params.email)
            .where("password", "==", req.params.password);
        const querySnapshot = await query.get();

        //const response = querySnapshot.data();
        const docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            id: doc.id,
            /*image: doc.data().image,
            name: doc.data().name,
            businessName: doc.data().businessName,
            profCategory: doc.data().profCategory,
            presentation: doc.data().presentation,
            CIF: doc.data().CIF,
            address: doc.data().address,
            CP: doc.data().CP,
            location: doc.data().location,
            IVA: doc.data().IVA,
            IBAN: doc.data().IBAN,
            //bills: [doc.data().bills],
            baseReward: doc.data().baseReward,*/
            idUser: doc.data().idUser,
            opportunities: doc.data().opportunities,
            image: doc.data().image,
            name: doc.data().name,
            email: doc.data().email,
            telephone: doc.data().telephone,
            businessName: doc.data().businessName,
            tradename: doc.data().tradename,
            profCategory: doc.data().profCategory,
            community: doc.data().community,
            presentation: doc.data().presentation,
            //
            CIF: doc.data().CIF,
            address: doc.data().address,
            CP: doc.data().CP,
            location: doc.data().location,
            IVA: doc.data().IVA,
            IBAN: doc.data().IBAN,
            //bills: [doc.data().bills],
            baseReward: doc.data().baseReward,
            //
            //keywords: [doc.data().keywords],
            password: doc.data().password,
            cardNumber: doc.data().cardNumber,
            cardType: doc.data().cardType,
            cardMonthExpir: doc.data().cardMonthExpir,
            cardYearExpir: doc.data().cardYearExpir,
            cvc: doc.data().cvc,
        }));

        return res.status(200).json({profile: response});
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}),

app.get('/getProfile/:id', async(req, res) => {
    try{
        const query = db.collection('users')
            .doc(req.params.id);
        const querySnapshot = await query.get();

        //const response = querySnapshot.data();
        const docs = querySnapshot.docs;
        //const response = docs.map(doc => ({
          //  id: doc.id,
            /*image: doc.data().image,
            name: doc.data().name,
            businessName: doc.data().businessName,
            profCategory: doc.data().profCategory,
            presentation: doc.data().presentation,
            CIF: doc.data().CIF,
            address: doc.data().address,
            CP: doc.data().CP,
            location: doc.data().location,
            IVA: doc.data().IVA,
            IBAN: doc.data().IBAN,
            //bills: [doc.data().bills],
            baseReward: doc.data().baseReward,*/
            //id: doc.id,
         //   opportunities: [],
            /*image: doc.data().image,*/
           // name: doc.data().name,
            /*email: doc.data().email,
            telephone: doc.data().telephone,
            businessName: doc.data().businessName,
            tradename: doc.data().tradename,
            profCategory: doc.data().profCategory,
            community: doc.data().community,
            presentation: doc.data().presentation,
            //
            CIF: doc.data().CIF,
            address: doc.data().address,
            CP: doc.data().CP,
            location: doc.data().location,
            IVA: doc.data().IVA,
            IBAN: doc.data().IBAN,
            //bills: [doc.data().bills],
            baseReward: doc.data().baseReward,
            //
            //keywords: [doc.data().keywords],
            password: doc.data().password,
            cardNumber: doc.data().cardNumber,
            cardType: doc.data().cardType,
            cardMonthExpir: doc.data().cardMonthExpir,
            cardYearExpir: doc.data().cardYearExpir,
            cvc: doc.data().cvc,*/
        //}));
        console.log(querySnapshot.docs);
        return res.status(200).json({
            profile: 
                querySnapshot.data()
        });
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}),

/*async function getAncientOpors(id){
    let opors = [];

    try{
        const query = db.collection('users')
            .doc(id);
        const querySnapshot = await query.get();
        //const response = querySnapshot.data();
        const docs = querySnapshot.docs;

        opors.push(querySnapshot.data().opportunities);
        console.log(opors);
        return opors;
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
};*/

app.patch('/profileOpor/:id', async(req, res) => {
    try{
        const doc = await db.collection('users')
            //.where("email", "==", req.params.email)
            .doc(req.params.id)
            .update(
                {
                    opportunities: req.body.opportunities,
                }
            );
        //console.log(getAncientOpors());
        return res.status(204).json();
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}),

app.get('/showProfiles', async(req, res) => {
    try{
        const query = db.collection('users');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            id: doc.id,
            //image: doc.data().image,
            name: doc.data().name,
            /*businessName: doc.data().businessName,
            profCategory: doc.data().profCategory,
            presentation: doc.data().presentation,
            CIF: doc.data().CIF,
            address: doc.data().address,
            CP: doc.data().CP,
            location: doc.data().location,
            IVA: doc.data().IVA,
            IBAN: doc.data().IBAN,
            bills: [doc.data().bills],
            baseReward: doc.data().baseReward,*/
        }));

        return res.status(200).json({profiles: response});
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})

app.patch('/editMyProfile/:id', async(req, res) => {
    try{
        const document = await db.collection('users')
            //.where("email", "==", req.params.email)
            .doc(req.params.id)
            .update({...req.body})
        return res.status(204).json();
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}),

app.post("/createUser", async(req, res) => {
    try{
        await db.collection('users')
        .doc()
        .create(
            {
                image: req.body.image,
                name: req.body.name,
                email: req.body.email,
                telephone: req.body.telephone,
                businessName: req.body.businessName,
                tradename: req.body.tradename,
                profCategory: req.body.profCategory,
                community: req.body.community,
                presentation: req.body.presentation,
                //
                CIF: req.body.CIF,
                address: req.body.address,
                CP: req.body.CP,
                location: req.body.location,
                IVA: req.body.IVA,
                IBAN: req.body.IBAN,
                //bills: [req.body.bills],
                baseReward: req.body.baseReward,
                //
                //keywords: [req.body.keywords],
                password: req.body.password,
                cardNumber: req.body.cardNumber,
                cardType: req.body.cardType,
                cardMonthExpir: req.body.cardMonthExpir,
                cardYearExpir: req.body.cardYearExpir,
                cvc: req.body.cvc,
            }
        );

        return res.status(204).json();
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
});

//Team
app.get('/showTeams', async(req, res) => {
    try{
        const query = db.collection('teams');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;

        const members = db.collection('users');
        const membersSnapshot = await members.get();
        const memDocs = membersSnapshot.docs;

        const response = docs.map(doc => ({
            id: doc.data().id,
            name: doc.data().name,
            members: [{
                name: "",
            }],
                /*memDocs.where('id', 'in', doc.data().members)
                .map(mem => ({
                    name: mem.data().name
                }))*/
                /*doc.data().members.map((id) => {
                    const mem = db.ref('users/' + id).get().docs;
                    mem.name;
                }),*/
        }));
        console.log(response);

        return res.status(200).json(response);
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}),

app.post("/createTeam", async(req, res) => {
    try{
        await db.collection('teams')
        .doc()
        .create(
            {
                name: req.body.name,
                id: req.body.id,
                membersId: [req.body.membersId],
            }
        );

        return res.status(204).json();
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})

/*app.post('/profile', async (req, res) =>{
    try{
        await db.collection('profile')
        .doc()
        .create(
            {
                name: req.body.name,
                email: req.body.email,
                telephone: req.body.telphone,
                businessName: req.body.businessName,
                tradename: req.body.tradename,
                profCategory: req.body.profCategory,
                community: req.body.community,
                presentation: req.body.presentation,
                keywords: req.body.keyword,
                password: req.body.password,
                cardNumber: req.body.cardNumber,
                cardType: req.body.cardType,
                cardMonthExpir: req.body.cardmonthExpir,
                cardYearExpir: req.body.cardYearExpir,
                cvc: req.body.cvc,
                IBANnumber: req.body.IBANnumber,
            });

        return res.status(204).json();
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})*/

//Eventos
app.post('/createEvent', async (req, res) =>{
    try{
        await db.collection('events')
        .doc()
        .create(
            {
                title: req.body.title,
                description: req.body.description,
                dateStart: req.body.dateStart,
                dateEnd: req.body.dateEnd,
                address: req.body.address,
                contactName: req.body.contactName,
                telephone: req.body.telephone,
                image: req.body.image,
            });

        return res.status(204).json();
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
});

app.get('/showEvents', async (req, res) =>{
    try{
        const query = db.collection('events');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            image: doc.data().image,
            title: doc.data().title,
            dateStart: doc.data().dateStart,
            dateEnd: doc.data().dateEnd,
            description: doc.data().description,
            assistants: 0,
        }))

        return res.status(200).json({events: response});
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
});

//Ofertas
app.post('/createOffer', async (req, res) =>{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
    dd = '0' + dd;
    }

    if (mm < 10) {
    mm = '0' + mm;
    }

    today = dd + '/' + mm + '/' + yyyy;
    try{
        await db.collection('offers')
        .doc()
        .create(
            {
                //idOffer: req.body.idOffer,
                user: req.body.user,
                title: req.body.title,
                description: req.body.description,
                reward: req.body.reward,
                typeReward: req.body.typeReward,
                image: req.body.image,
                video: req.body.video,
                date: today,
            });

        return res.status(204).json();
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
});

app.get('/getOffer/:id', async(req, res) => {
    try{
        const query = db.collection('offers')
            .doc(req.params.id);
        const querySnapshot = await query.get();

        //const response = querySnapshot.data();
        const docs = querySnapshot.docs;
           
        console.log(querySnapshot.docs);
        return res.status(200).json({
            offer: 
                querySnapshot.data()
        });
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}),

app.get('/showOffers', async (req, res) => {
    try{
        const query = db.collection('offers');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            id: doc.id,
            user: doc.data().user,
            image: doc.data().image,
            video: doc.data().video,
            title: doc.data().title,
            date: doc.data().date,
            description: doc.data().description,
            reward: doc.data().reward,
            typeReward: doc.data().typeReward,
        })).sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime());

        return res.status(200).json({offers: response});
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
});


//Actualizar ofertas y oportunidades, el apartado de idOpor(en ofertas) que 
//es un array que se le añade otra opor y el de idOffer(en oportunidades) que 
//se pone la offer a la que se envía.


//Oportunidades ******************************************
app.post('/createOpportunity', async (req, res) =>{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
    dd = '0' + dd;
    }

    if (mm < 10) {
    mm = '0' + mm;
    }

    today = dd + '/' + mm + '/' + yyyy;
    try{
        await db.collection('opportunities')
        .doc()
        .create(
            {
                idOpor: req.body.idOpor,
                idOffer: req.body.idOffer,
                idUser: req.body.idUser,
                description: req.body.description,
                name: req.body.name,
                telephone: req.body.telephone,
                email: req.body.email,
                date: today,
            });

        return res.status(204).json();
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
});

app.get('/getOpportunity/:idOpor', async (req, res) =>{
    try{
        const query = db.collection('opportunities')
            .where("idOpor","==",req.params.idOpor);
        const querySnapshot = await query.get();

        //const response = querySnapshot.data();
        const docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            idOpor: doc.data().idOpor,
            idOffer: doc.data().idOffer,
            idUser: doc.data().idUser,
            description: doc.data().description,
            name: doc.data().name,
            telephone: doc.data().telephone,
            email: doc.data().email,
            date: doc.data().date,
        }));

        return res.status(200).json({
            opportunity: response
        });
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
});

app.get('/showOpportunity', async (req, res) =>{
    try{
        const query = db.collection('opportunities');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            receiver: doc.data().receiver,
            contactName: doc.data().contactName,
            telephone: doc.data().telephone,
            date: doc.data().date,
            description: doc.data().description,
            titleOffer: doc.data().description,
            state: doc.data().state,
            payment: doc.data().payment,
            reward: doc.body.reward,
            comment: doc.body.comment,
        }))

        return res.status(200).json({opportunities: response});
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
});

//Mensajes
app.post('/createMessage', async (req, res) =>{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
    dd = '0' + dd;
    }

    if (mm < 10) {
    mm = '0' + mm;
    }

    today = dd + '/' + mm + '/' + yyyy;
    try{

        const database = await db.collection('messages')
        .doc()
        .create(
            {
                transmitter: req.body.message,
                receiver: req.body.receiver,
                message: req.body.message,
            });

        return res.status(204).json();
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
});

app.get('/showMessages', async (req, res) =>{
    try{
        const query = db.collection('messages');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            receiver: doc.data().receiver,
            contactName: doc.data().contactName,
            telephone: doc.data().telephone,
            date: doc.data().date,
            description: doc.data().description,
            titleOffer: doc.data().description,
            state: doc.data().state,
            payment: doc.data().payment,
            reward: doc.body.reward,
            comment: doc.body.comment,
        }))

        return res.status(200).json(response);
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
});

module.exports = app;