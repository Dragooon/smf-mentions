/**
 * Javascript interface for active suggestions while posting
 *
 * @author Shitiz Garg <mail@dragooon.net>
 * @copyright 2014 Shitiz Garg
 * @license Simplified BSD (2-Clause) License
 */

var mentionInit = function()
{
	$(function()
	{
		var config = {
			at: '@',
			data: [],
			show_the_at: true,
			callbacks: {
				remote_filter: function(query, callback)
				{
					if (query.length < 2)
						return;

					$.ajax({
						url: smf_scripturl + '?action=suggest;' + smf_sessvar + '=' + smf_sessid + ';xml',
						method: 'GET',
						data: {
							search: query,
							suggest_type: 'member'
						},
						success: function(data)
						{
							var members = $(data).find('smf > items > item');
							var callbackArray = [];
							$.each(members, function(index, item)
							{
								callbackArray[callbackArray.length] = {
									name: $(item).text()
								};
							});

							callback(callbackArray);
						}
					});
				}
			}
		};

		var iframe = $('#html_message');
		if (typeof iframe[0] != 'undefined')
			$(iframe[0].contentDocument.body).atwho(config);
		$('textarea[name=message]').atwho(config);
	});
};

var atWhoElement = document.createElement('script');
atWhoElement.src = atwho_url;
atWhoElement.type = 'text/javascript';
atWhoElement.onload = mentionInit;

if (typeof $ == 'undefined')
{
	var scriptElement = document.createElement('script');
	scriptElement.src = jquery_url;
	scriptElement.type = 'text/javascript';

	scriptElement.onload = function()
	{
		document.getElementsByTagName('head')[0].appendChild(atWhoElement);
	};

	document.getElementsByTagName('head')[0].appendChild(scriptElement);
}
else
	document.getElementsByTagName('head')[0].appendChild(atWhoElement);