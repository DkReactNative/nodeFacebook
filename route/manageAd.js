const adRoutes = (app, fs) => {
    const adsSdk = require('facebook-nodejs-business-sdk');
    const config = require('./config')
    const request = require('request-promise');
    const api = adsSdk.FacebookAdsApi.init(config.accessToken);
    const AdAccount = adsSdk.AdAccount;
    const Campaign = adsSdk.Campaign;
    const account = new AdAccount(config.accountId);
    var campaigns;

    // READ
    app.get('/campaign', (req, res) => {
        let { fields, params } = req;
        fields = [];
        params = {
            'name': params.name,
            'status': params.status,
        };
        account.read([AdAccount.Fields.name])
            .then((account) => {
                return account.getCampaigns(params, { limit: 10 }) // fields array and params
            })
            .then((result) => {
                campaigns = result
                campaigns.forEach((campaign) => console.log(campaign.name))
                res.status(200).send({ campaign: campaigns });
            }).catch(console.error);
    });



    // CREATE
    app.post('/campaign', (req, res) => {

        let { fields, params } = req;
        fields = [];
        params = {
            'special_ad_category': params.special_ad_category,
            'name': params.name,
            'objective': params.objective,
            'status': params.status,
        };
        account
            .createCampaign(
                fields, params
            )
            .then((campaign) => {
                console.log(campaign)
                res.status(200).send({ campaign: campaigns });
            })
            .catch((error) => {
                console.log(error)
            });
    })


    // create Add set
    app.post('/addset', (req, res) => {

        let { fields, params } = req;
        fields = [];
        params = {
            'name': params.name,
            'optimization_goal': params.optimization_goal,
            'billing_event': params.billing_event,
            'bid_amount': params.bid_amount,
            'daily_budget': params.daily_budget,
            'campaign_id': params.campaign_id,
            'targeting': { geo_locations: params.geo_locations, facebook_positions: params.facebook_positions },
            'status': params.status,
            'promoted_object': { 'page_id': params.page_id },
        };
        account
            .createAdSet(
                fields, params
            )
            .then((addsets) => {
                console.log(addsets)
                res.status(200).send({ addsets: addsets });
            })
            .catch((error) => {
                console.log(error)
            });
    })

    // create Add 
    app.post('/ad', (req, res) => {

        let { fields, params } = req;
        fields = [];
        params = {
            'name': params.name,
            'adset_id': params.adset_id,
            'creative': { 'creative_id': params.creative_id },
            'status': params.status,
        };

        account
            .createAd(
                fields, params
            )
            .then((ad) => {
                console.log(addsets)
                res.status(200).send({ ad: ad });
            })
            .catch((error) => {
                console.log(error)
            });
    })

    // UPDATE campaign
    app.put('/campaign/:id', (req, res) => {
        let { fields, params } = req;
        fields = [];
        params = {
            'id': req.params.id,
            'name': params.name
        };
        new Campaign(req.params.id, params)
            .update().then((result) => {
                console.log(addsets)
                res.status(200).send({ result: result });
            })
            .catch((error) => {
                console.log(error)
            });;
    });

    // UPDATE ad
    app.put('/ad/:id', (req, res) => {
        let { fields, params } = req;
        fields = [];
        params = {
            'id': req.params.id,
            'name': params.name
        };
        new Campaign(req.params.id, params)
            .update().then((result) => {
                console.log(addsets)
                res.status(200).send({ result: result });
            })
            .catch((error) => {
                console.log(error)
            });
    });


    // DELETE campaign
    app.delete('/campaign/:id', (req, res) => {
        new Campaign(req.params).delete().then((result) => {
                console.log(addsets)
                res.status(200).send({ result: result });
            })
            .catch((error) => {
                console.log(error)
            });;;
    });
};

module.exports = adRoutes;