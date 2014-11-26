/**
 * Javascript interface for active suggestions while posting
 *
 * @author Shitiz Garg <mail@dragooon.net>
 * @copyright 2014 Shitiz Garg
 * @license Simplified BSD (2-Clause) License
 */

var mentionInit = function()
{
	var fails = [];

	var config = {
		at: '@',
		data: [],
		show_the_at: true,
		limit: 10,
		callbacks: {
			matcher: function(flag, subtext, should_start_with_space) {
				var match = '', started = false;
				var string = subtext.split('');
				for (var i = 0; i < string.length; i++)
				{
					if (string[i] == flag && (!should_start_with_space || i == 0 || /[\s\n]/gi.test(string[i - 1])))
					{
						started = true;
						match = '';
					}
					else if (started)
						match = match + string[i];
				}

				if (match.length > 0)
					return match;

				return null;
			},
			remote_filter: function (query, callback) {
				if (typeof query == 'undefined' || query.length < 2 || query.length > 60)
					return;

				for (i in fails)
					if (query.substr(0, fails[i].length) == fails[i])
						return;

				$.ajax({
					url: smf_scripturl + '?action=suggest;' + smf_sessvar + '=' + smf_sessid + ';xml',
					method: 'GET',
					data: {
						search: query,
						suggest_type: 'member'
					},
					success: function (data) {
						var members = $(data).find('smf > items > item');
						if (members.length == 0)
							fails[fails.length] = query;

						var callbackArray = [];
						$.each(members, function (index, item) {
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

	if (typeof $.fn.atwho == 'undefined' && typeof jQuery.fn.atwho != 'undefined')
	{
		var iframe = jQuery('#html_message');

		if (typeof iframe[0] != 'undefined')
			jQuery(iframe[0].contentDocument.body).atwho(config);
		jQuery('textarea[name=message]').atwho(config);
	}
	else
	{
		var iframe = $('#html_message');
		if (typeof iframe[0] != 'undefined')
			$(iframe[0].contentDocument.body).atwho(config);
		$('textarea[name=message]').atwho(config);
	}
};

var atWhoElement = document.createElement('script');
atWhoElement.src = atwho_url;
atWhoElement.type = 'text/javascript';
atWhoElement.onload = mentionInit;

if (typeof $ == 'undefined' || (parseInt($.fn.jquery.substr(0, 1)) == 1 && parseInt($.fn.jquery.substr(2, 3)) < 8) || jQuery.fn.jquery != $.fn.jquery)
{
	var scriptElement = document.createElement('script');
	scriptElement.src = jquery_url;
	scriptElement.type = 'text/javascript';

	scriptElement.onload = function () {
		document.body.appendChild(atWhoElement);
	};

	document.body.appendChild(scriptElement);
}
else
	document.body.appendChild(atWhoElement);