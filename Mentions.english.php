<?php
/**
 * Language file for mentions
 *
 * @author Shitiz Garg <mail@dragooon.net>
 * @copyright 2014 Shitiz Garg
 * @license Simplified BSD (2-Clause) License
 */

global $txt, $context;

$txt['mentions_subject'] = 'MENTIONNAME, you have been mentioned at a post in ' . $context['forum_name'];
$txt['mentions_body'] = 'Hello MENTIONNAME!

MEMBERNAME mentioned you in the post "POSTNAME", you can view the post at POSTLINK

Regards';
$txt['mentions'] = 'Mentions';
$txt['mentions_profile_title'] = 'Posts mentioning the user';
$txt['mentions_post_subject'] = 'Subject';
$txt['mentions_member'] = 'Mentioned By';
$txt['mentions_post_time'] = 'Mentioned Time';
$txt['permissionname_mention_member'] = 'Mention members';
$txt['permissionhelp_mention_member'] = 'Allow members to tag other members and alert them via mentioning them via @username syntax';
$txt['email_mentions'] = 'E-mail mention notifications';