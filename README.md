![Transfer Facebook Leads to Google Sheets with Google Apps Script](https://raw.githubusercontent.com/simmatrix/facebook-leads-google-sheets-integration/master/images/0%20-%20intro.png)

Here's a visual guide on how to transfer your Facebook Leads to Google Sheets in realtime, with the use of Google Apps Script, without using Facebook Javascript SDK. Refer to the [bottom section](https://github.com/simmatrix/facebook-leads-google-sheets-integration#additional) for the way to do it in non-realtime (pull in bulk) as well.

### Reason for doing so
To be quick, there are actually lots of paid or free integration services out there which you can directly use. Free service does have its limitations. Since I am now having my year-end holiday, so it is totally not a big deal for me to spend some time doing the manual configuration.

### Quick introduction
We will be using Google Apps Script to write our integration script, well it does have its [quotas](https://script.google.com/dashboard/quota) as well but they are very high which would definitely meet most people's needs. The overall flow goes like this:
1. Create a Facebook Lead Ads
2. Prepare a blank Google Sheets
3. Create a Facebook app
4. Create a Facebook webhook
5. Get a Facebook page access token
6. Subscribe your Facebook page to your Facebook webhook
7. Update your webhook script to receive and store your lead data in Google Sheets

### Useful Tools Being Used
- Facebook Graph API Explorer: https://developers.facebook.com/tools/explorer/
- Facebook Lead Ads Testing Tool: https://developers.facebook.com/tools/lead-ads-testing
- Facebook Access Token Debugger: https://developers.facebook.com/tools/debug/accesstoken

### Additional Useful Reference Materials
- A very good documentation explaining about Facebook access token expiration https://developers.facebook.com/docs/facebook-login/access-tokens/expiration-and-extension

# Let's begin!

#### Step 1: Create a Facebook Lead Ads
Head over to your Facebook page settings page > "Publishing Tools" > "Forms Library". Start creating a Lead Ads if you don't have an existing one.
![step1](https://raw.githubusercontent.com/simmatrix/facebook-leads-google-sheets-integration/master/images/1%20-%20create%20lead%20ads.png)
![step2](https://raw.githubusercontent.com/simmatrix/facebook-leads-google-sheets-integration/master/images/2%20-%20create%20lead%20ads.png)
![step3](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/3%20-%20create%20lead%20ads.png)
![step4](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/4%20-%20create%20lead%20ads.png)
![step5](https://raw.githubusercontent.com/simmatrix/facebook-leads-google-sheets-integration/master/images/5%20-%20create%20lead%20ads.png)
![step6](https://raw.githubusercontent.com/simmatrix/facebook-leads-google-sheets-integration/master/images/6%20-%20create%20lead%20ads.png)

After the step below, just click on the "Finish" button
![step7](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/7%20-%20create%20lead%20ads.png)

Here's your newly created Lead Ads! You may click on the "Preview" link to view your lead ads.
![step8](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/8%20-%20create%20lead%20ads.png)

Here's the lead ads which I have created.
![step9](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/9%20-%20create%20lead%20ads.png)

#### Step 2: Prepare a blank Google Sheets
![step10](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/10%20-%20prepare%20excel%20sheet.png)

#### Step 3: Create a Facebook App
Head over to https://developers.facebook.com/apps/ and add a new app.
![step11](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/11%20-%20create%20facebook%20app.png)

Key in a display name for your new app.
![step12](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/12%20-%20create%20facebook%20app.png)

Key in the security check and you are all set with a new Facebook app!
![step13](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/13%20-%20create%20facebook%20app.png)

#### Step 4: Create a Facebook Webhook
Mouse over to the "Webhooks" selection and click on the "Set Up" button
![step14](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/14%20-%20add%20webhook.png)

You will be directed to this page. Now keep this browser tab open. We need to head over to Google Apps Script first.
![step15](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/15%20-%20add%20webhook.png)

In your Google Drive, create a new Google Apps Script
![step16](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/16%20-%20setup%20webhook.png)

This is for Facebook to verify the existence of our webhook. Copy these lines of code into your script panel. You can put any random string as the `hub.verify_token`.
> You can copy the code  [here](https://github.com/simmatrix/facebook-leads-google-sheets-integration/blob/master/scripts/Code.gs) but please only copy the doGet() section first and NOT the whole script!

![step17](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/17%20-%20setup%20webhook.png)

Then you need to deploy your script to make it live.
![step18](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/18%20-%20deploy%20webhook.png)

Make sure you are executing your script as `Me (<your_email_address>)` and give `Anyone, even anonymous` the access to your app. And the Project version should be `New`.
![step19](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/19%20-%20deploy%20webhook.png)

After you have made it live, copy your web app URL. 
![step20](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/20%20-%20deploy%20webhook.png)

You may now head back to your Facebook Developers App page.
![step21](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/21%20-%20register%20webhook.png)

Make sure to change the `User` option to `Page` from the drop down list
![step22](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/22%20-%20register%20webhook.png)

Key in the web app URL that you copied from your Google Apps script just now into the Callback URL field, and key in the same verify_token that you have keyed into your Google Apps script. Click `Verify and Save` to finish this off.
![step23](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/23%20-%20register%20webhook.png)

You will now see a list of items below
![step24](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/24%20-%20make%20subscription.png)

Search for the item `leadgen` and hit on the "Subscribe" button
![step25](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/25%20-%20make%20subscription.png)
![step26](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/26%20-%20make%20subscription.png)

#### Step 5: Get a Facebook page access token
> For this section, you would need to head over to [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer) 

### The Forbidden Path
Before proceeding further, I would like to let you know that actually there is a quick way of obtaining a `page access token` but I would not encourage you to do so because the token will expire in about less than 2 hours. You would need a long-lived token that never expire.

Here's a quick way of obtaining a `page access token`, just select your Facebook page from the drop-down list beside the Access Token field. You may click on the blue "info" icon within the Access Token field to view its expiry time. You can see that it will be expiring soon. I created it at around 7.43PM and it will expire at 9.00PM.

![step27](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/27%20-%20shortcut%20of%20getting%20page%20access%20token.png)

So right now I would take you for a ride of how to obtain a long-lived `page access token`. Here's a big picture:
1. First we would need to get a short-lived `user access token`
2. Then we exchange the short-lived `user access token` with a long-lived one
3. Finally we request for a `page access token` with our long-lived `user access token`

> If our user access token is long-lived, so will our page access token. And vice versa...

### The Right Path 

#### 1. Get Short-lived User Access Token
On a fresh page of your Graph API Explorer...
![step28](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/28%20-%20get%20short-lived%20user%20access%20token.png)

Make sure you have selected the correct Facebook app at the top-right drop-down list, for mine, it is `LeadAds GoogleSheets Integration`. After this, from the "Get Token" drop-down list, click on `Get User Access Token`
![step29](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/29%20-%20get%20short-lived%20user%20access%20token.png)

Tick on the `manage_pages` checkbox
![step30](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/30%20-%20get%20short-lived%20user%20access%20token.png)

Proceed as prompted
![step31](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/31%20-%20get%20short-lived%20user%20access%20token.png)
![step32](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/32%20-%20get%20short-lived%20user%20access%20token.png)

Copy the string as shown in the Access Token field. This is your short-lived `user access token`.
![step33](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/33%20-%20get%20short-lived%20user%20access%20token.png)

#### 2. Exchange Your Short-lived User Access Token with a Long-lived one
Open a blank text editor and key in this line of code. Remember to replace the placeholders `INSERT_YOUR_USER_ACCESS_TOKEN`, `INSERT_YOUR_CLIENT_ID`, `INSERT_YOUR_APP_SECRET` with your own data.
```
oauth/access_token?grant_type=fb_exchange_token&fb_exchange_token=INSERT_YOUR_USER_ACCESS_TOKEN&client_id=INSERT_YOUR_CLIENT_ID&client_secret=INSERT_YOUR_APP_SECRET
```
![step34](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/34%20-%20exchange%20for%20long-lived%20user%20access%20token.png)

You can obtain both your App ID and App Secret in the dashboard of your Facebook App.
![step35](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/35%20-%20exchange%20for%20long-lived%20user%20access%20token.png)

Now you need to copy and paste the text that you have just typed in your text editor into the text field beside of the Submit button, then hit Submit.
![step36](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/36%20-%20exchange%20for%20long-lived%20user%20access%20token%20.png)

The result shown is your long-lived `user access token`.
![step37](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/37%20-%20exchange%20for%20long-lived%20user%20access%20token.png)

#### 3. Get a page access token with your user access token

Key in `me/accounts` to the text field beside the Submit button, and make sure you have pasted your long-lived `user access token` into the Access Token field, then hit the Submit button. The result shown are all of your Facebook pages
> Copy the `access_token` and `id` (Your Facebook Page ID) of your intended Facebook page.

![step39](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/39%20-%20get%20long-lived%20page%20access%20token.png)

Optionally, if you're curious to know whether this `page access token` expires or not, you may head on to [Facebook Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken) and give it a check! The result is `Never` expires.
![step40](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/40%20-%20double%20confirm%20expiry%20date%20of%20page%20access%20token.png)

#### Step 6: Subscribe your Facebook page to your Facebook webhook
To link together both of your Facebook page and webhook, you would need to make a `POST` request with the endpoint `<YOUR_FACEBOOK_PAGE_ID>/subscribed_apps`. Make sure that it is `POST`, and make sure that you have keyed in your `page access token` to the Access Token field, then hit Submit.
![step41](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/41%20-%20make%20your%20page%20subscribe%20to%20the%20webhook.png)

Now you can make a `GET` request with the same endpoint as above to view the list of subscribed apps.
![step42](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/42%20-%20view%20subscribed%20webhook.png)

#### Step 7: Update your webhook script to receive and store your lead data in Google Sheets
Remember previously we only have `doGet()` function, now we add the `doPost()` function.
![step43](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/43%20-%20modify%20webhook%20to%20receive%20data.png)

If you're curious of where you can obtain your Google Spreadsheet ID, you can get it from the URL itself.
![extra](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/extra.png)

Proceed to deploy your web app
![step44](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/44%20-%20deploy%20your%20modified%20webhook.png)

Make sure you are executing your script as `Me (<your_email_address>)` and give `Anyone, even anonymous` the access to your app. And the Project version should be `New`.

![step45](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/45%20-%20deploy%20your%20modified%20webhook.png)

Because you have now added the lines of code that will access and write to your Google Sheets, you would need to authorize and grant the necessary permissions for your Google Apps script to write to your Google Sheets on behalf of you.

![step46](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/46%20-%20grant%20permission%20for%20your%20app%20to%20read%20google%20sheets.png)

Sign in with your Google account

![step47](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/47%20-%20granting%20permission.png)

Your browser will prompt a warning that this app is not verified. You may click on the `Advanced` link and proceed. No worries, after all this app is being created by you yourself so it's safe.
![step48](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/48%20-%20granting%20permission.png)

After clicking on the `Advanced` link, you may proceed by clicking the link at the bottom `Go to xxxxx (unsafe)` 
![step49](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/49%20-%20granting%20permission.png)

Grant the permission for your Google Apps script to view and manage your spreadsheets in Google Drive.
![step50](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/50%20-%20granting%20permission.png)

Now you would need to head over to the Business Settings page of your Facebook Page > "Leads Access" > "CRMs". Select the `Facebook APP` then click on `Assign access` button.
![step51](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/51%20-%20granting%20access%20to%20your%20app.png)

Then you will see the indicator turns green.
![step52](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/52%20-%20granting%20access%20to%20your%20app.png)

#### Step 8: Test sending a lead
> For this section, you would need to head over to [Facebook Lead Ads Testing Tool](https://developers.facebook.com/tools/lead-ads-testing) 
![step53](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/53%20-%20test%20sending%20a%20lead.png)

Hit on the "Create lead" button and wait for a moment, then hit on the button "Track status"
![step54](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/54%20-%20test%20sending%20a%20lead.png)

If you check your Google Sheets now, you will see some input
![step55](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/55%20-%20test%20sending%20a%20lead.png)

Now you can clear those entries and replace with a proper header
![step56](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/56%20-%20test%20sending%20a%20lead.png)

Copy the `doPost()` function from [this file](https://github.com/simmatrix/facebook-leads-google-sheets-integration/blob/master/scripts/Code.gs) and paste it into your script panel. Remember to replace the placeholders `INSERT_YOUR_GOOGLE_SHEETS_ID` and `INSERT_YOUR_LONG_LIVED_PAGE_ACCESS_TOKEN` with your own data.
![step57](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/57%20-%20record%20the%20lead%20info.png)

You can now deploy your web app again.
![step58](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/58%20-%20record%20lead%20info.png)

Make sure you are executing your script as `Me (<your_email_address>)` and give `Anyone, even anonymous` the access to your app. And the Project version should be `New`.
![step59](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/59%20-%20record%20lead%20info.png)

You can now head over to [Facebook Lead Ads Testing Tool](https://developers.facebook.com/tools/lead-ads-testing)  to test sending a lead again.
![step60](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/60%20-%20test%20submit%20a%20lead%20again.png)

### TADAA... THE END!
![step61](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/61%20-%20check%20test%20lead.png)

### Additional
So for the above we deal with pulling of Facebook Leads in real-time. How if you just implement it half-way when your campaigns are running? You definitely need to pull all of the other previous leads into your Google Sheets as well right... You can refer to this [alternative script](https://github.com/simmatrix/facebook-leads-google-sheets-integration/blob/master/scripts/CodeAdditional.gs) of which can be called by `<YOUR_GOOGLE_SCRIPTS_WEB_APP_URL>?pull_all_leads=true`. Kindly refer to the `doGet()` function. It handles the pagination as well (as Facebook returns 25 leads per call)

To find the ID of your lead form to be keyed into `var lead_form_id = 'INSERT_YOUR_LEAD_FORM_ID';`, you can go to [Facebook Lead Ads Testing Tool](https://developers.facebook.com/tools/lead-ads-testing) and create a test lead, then look at the `Payload` column at the bottom. `..."form_id":"xxxxxxxxxxx"...`
![step60](https://github.com/simmatrix/facebook-leads-google-sheets-integration/raw/master/images/additional.png)

In this additional script, I have also sorted the data in the order which I have wanted before inserting it into Google Sheets because I realized that for some of my previous leads, sometimes "email" comes first, sometimes "full_name" comes first, so without ordering them in proper format, it would be a mess in Google Sheets later.

### Feedback
Should you have any feedback, feel free to send your enquiries via simmatrix100[at]gmail[dot]com.
