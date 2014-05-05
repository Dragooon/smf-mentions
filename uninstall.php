<?php
/**
 * Removes hooks which are instilled by mentions mod
 *
 * @author Shitiz Garg <mail@dragooon.net>
 * @copyright 2014 Shitiz Garg
 * @license Simplified BSD (2-Clause) License
 */

if (!defined('SMF'))
	require_once('SSI.php');

$hooks = array(
	'integrate_pre_include' => '$sourcedir/Mentions.php',
	'integrate_profile_areas' => 'mentions_profile_areas',
	'integrate_load_permissions' => 'mentions_permissions',
	'integrate_bbc_codes' => 'mentions_bbc',
	'integrate_menu_buttons' => 'mentions_menu',
	'integrate_register' => 'mentions_register',
);

foreach ($hooks as $hook => $function)
	remove_integration_function($hook, $function);

$smcFunc['db_query']('', '
	DELETE FROM {db_prefix}scheduled_tasks
	WHERE task = {string:task}',
	array(
		'task' => 'removeMentions',
	)
);