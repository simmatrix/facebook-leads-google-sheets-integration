function doGet(request)
{
  if (request.parameter['hub.verify_token'] == 'abcdefghijklmn0123456789') {
    return ContentService.createTextOutput(request.parameter['hub.challenge']);
  }
}

function doPost(request)
{
  var spreadsheet = SpreadsheetApp.openById("1gyM8ZZmf6YaHLyTJNPqX7GzIwRv47pJxqnKr6v8497M");
  var active_sheet = spreadsheet.getSheetByName("Sheet1");
  var long_lived_page_access_token = 'EAAGEvLjo0xUBAMSXr6oIpZCAHRG5UlGPcpZCSGzjFxK2eujRRwGhUVPWbZCX2uOkNJmBLnsiAKFVXdidMCXR1YbwZBGSucciHtaeFbRktaDPBA23itksCxRxodDLuNVNPiV2cAblqZBigAxzqR6brE8o73uDtx5iXkpEJfVf7t5JVxXnT0H5DVXrgSJsRK7cZD';
  
  var returned_json = request.postData.getDataAsString();
  var returned_data = JSON.parse(returned_json);
  var entries = returned_data.entry;

  for( var i = 0; i < entries.length; i++ ) {
    var entry = entries[i];
    
    // Get the date and time we received the lead
    var submitted_epoch_timestamp = entry.time;
    var d = new Date( submitted_epoch_timestamp * 1000 );
    var submitted_at = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    
    // Get lead identifier
    var lead_id = entry.changes[0].value.leadgen_id;
    
    // Get lead information
    var lead_info_endpoint = 'https://graph.facebook.com/' + lead_id + '?access_token=' + long_lived_page_access_token;
    var lead_info_response = UrlFetchApp.fetch(lead_info_endpoint, {'method': 'get'});
    var lead_info = JSON.parse(lead_info_response);
    var field_data = lead_info.field_data;
    var final_lead_information = {};

    // Compile all data in an object
    for( var x = 0; x < field_data.length; x++ ) {
      final_lead_information[field_data[x].name] = field_data[x].values[0];
    }
    final_lead_information['submitted_at'] = submitted_at;
    
    // Construct the email content
    var plain_body = '';
    var html_body = '';
    var format_order = ['email', 'full_name', 'submitted_at'];
    for( var y = 0; y < format_order.length; y++ ) {
      
      // Plain Body Content
      if ( y > 0 ) { 
        plain_body += ' || ';
      }
      plain_body += final_lead_information[format_order[y]];
      
      // HTML Body Content
      var title = format_order[y];
      html_body += '<b>' + title.replace('_', ' ').toUpperCase() + ': </b>' + final_lead_information[format_order[y]] + '<br />';
    }
    
    // Send an email
    GmailApp.sendEmail("simmatrix100@gmail.com", "You have a new Facebook Lead", plain_body, {
      htmlBody: html_body,
      name: 'Facebook Lead Notifier',
      noReply: true,
      bcc: '', // a comma-separated list of email addresses to BCC
      cc: '', // a comma-separated list of email addresses to CC 
    });
  }
}