function doGet(request)
{
  if (request.parameter['hub.verify_token'] == 'abcdefghijklmn0123456789') {
    return ContentService.createTextOutput(request.parameter['hub.challenge']);
  }
}

function doPost(request)
{
  var spreadsheet = SpreadsheetApp.openById("INSERT_YOUR_GOOGLE_SHEETS_ID");
  var active_sheet = spreadsheet.getSheetByName("Sheet1");
  var long_lived_page_access_token = 'INSERT_YOUR_LONG_LIVED_PAGE_ACCESS_TOKEN';

  var returned_json = request.postData.getDataAsString();
  var returned_data = JSON.parse(returned_json);
  var entries = returned_data.entry;

  for( var i = 0; i < entries.length; i++ ) {
    var entry = entries[i];

    // Get the date and time we received the lead
    var submitted_epoch_timestamp = entry.time;
    var d = new Date( submitted_epoch_timestamp * 1000 );
    var submited_at = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

    // Get lead identifier
    var lead_id = entry.changes[0].value. leadgen_id;

    // Get lead information
    var lead_info_endpoint = 'https://graph.facebook.com/' + lead_id + '?access_token=' + long_lived_page_access_token;
    var lead_info_response = UrlFetchApp.fetch(lead_info_endpoint, {'method': 'get'});
    var lead_info = JSON.parse(lead_info_response);
    var field_data = lead_info.field_data;
    var final_lead_information = [];

    for( var x = 0; x < field_data.length; x++ ) {
      final_lead_information.push(field_data[x].values[0]);
    }

    final_lead_information.push(submited_at);

    // Record it in the Google Sheets
    active_sheet.appendRow(final_lead_information);
  }
}