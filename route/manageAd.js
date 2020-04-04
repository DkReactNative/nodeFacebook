const adRoutes = (app, fs) => {
const config=require('./config')
const bizSdk = require('facebook-nodejs-business-sdk');
const Ad = bizSdk.Ad;
const AdAccount = bizSdk.AdAccount;
const Business = bizSdk.Business;
const Campaign = bizSdk.Campaign;
const accountId = config.accountId;
const accessToken = config.accessToken;
const bussinessId = ''; //ADD business ID here.
const campaignId = ''; //ADD Campaign ID Here
const api = bizSdk.FacebookAdsApi.init(accessToken);
const account = new AdAccount(accountId);
const showDebugingInfo = false;

if (showDebugingInfo) {
  api.setDebug(true);
}

   

// READ
 app.get('/ad', (req, res) => {
    account
    .getAds([], {
      [Ad.Fields.effective_status]: [Ad.EffectiveStatus.active],
    })
    .then(ad => {
     console.log(ad)
     res.send({data:ad})
    })
    .catch(error=>{

    });
});


   
// CREATE
app.post('/ad', (req, res) => {

    account
    .createCampaign(
      [],
      {
        [Campaign.Fields.name]: 'Page likes campaign',
        [Campaign.Fields.status]: Campaign.Status.paused,
        [Campaign.Fields.objective]: Campaign.Objective.page_likes
      }
    )
    .then((campaign) => {
        console.log(campaign)
        res.json({campaigns:campaign});
        })
    
    .catch((error) => {
    });
})

    // UPDATE
    app.put('/ad/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            data[userId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/ad/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            delete data[userId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    });
};

module.exports = adRoutes;