var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('7TX3d0ISNLN7009IbGFXbQ');

module.exports.welcome = (function(user, callback) {
        self = {};
        console.log("sending mail");
    self.send = function(user, callback, err) {
        var message = {
            "html": null,
            "text": 'Hi '+ user.username +'\n\n'+
                    'Just wanted to let you know that your password has been sucessfully changed.\n'+
                    'Go ahead and login with your new account information!\n\n'+
                    'Thanks,\n'+
                    'The Sprk Team',
            "subject": "Password Reset successful",
            "from_email": "mykklemme@gmail.com",
            "from_name": "Myk Klemme",
            "to": [{
                    "email": user.email,
                    "name": user.username,
                    "type": "to"
                }],
            "important": false,
            "track_opens": null,
            "track_clicks": null,
            "auto_text": null,
            "auto_html": null,
            "inline_css": null,
            "url_strip_qs": null,
            "preserve_recipients": null,
            "bcc_address": null,
            "tracking_domain": null,
            "signing_domain": null,
            "merge": true,
            "global_merge_vars": [],
            "merge_vars": [],
            "tags": tags,
            "google_analytics_domains": [],
            "google_analytics_campaign": null,
            "metadata": null,
            "recipient_metadata": [],
            "attachments": [],
            "images": []
        };
        var async = false;
        var ip_pool = null;
        var send_at = null;

        mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
            console.log('Mandrill API called.');
            callback(err, 'done');
        }, function(e) {
            console.error('A mandrill error occurred: ' + e.name + ' - ' + e.message);
            callback(e);
        });
    };

    return self;
})();
