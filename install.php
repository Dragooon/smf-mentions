<?php
/**
 * Database installation script for @mentions mod
 *
 * @author Shitiz Garg <mail@dragooon.net>
 * @copyright 2014 Shitiz Garg
 * @license Simplified BSD (2-Clause) License
 */

if (!defined('SMF'))
	require_once('SSI.php');

global $smcFunc, $modSettings;

db_extend('Packages');
db_extend('Extra');

$smcFunc['db_create_table']('{db_prefix}log_mentions', array(
	array('name' => 'id_post', 'type' => 'int'),
	array('name' => 'id_member', 'type' => 'int'),
	array('name' => 'id_mentioned', 'type' => 'int'),
	array('name' => 'time', 'type' => 'int', 'null' => false, 'default' => 0),
	array('name' => 'unseen', 'type' => 'int', 'null' => false, 'default' => 1),
), array(
	array('type' => 'primary', 'columns' => array('id_post', 'id_member', 'id_mentioned')),
));
$smcFunc['db_add_column']('{db_prefix}members', array(
	'name' => 'email_mentions', 'type' => 'tinyint', 'null' => false, 'default' => 0,
));
$smcFunc['db_add_column']('{db_prefix}members', array(
	'name' => 'unread_mentions', 'type' => 'int', 'null' => false, 'default' => 0,
));

$hooks = array(
	'integrate_pre_include' => '$sourcedir/Mentions.php',
	'integrate_profile_areas' => 'mentions_profile_areas',
	'integrate_load_permissions' => 'mentions_permissions',
	'integrate_bbc_codes' => 'mentions_bbc',
	'integrate_menu_buttons' => 'mentions_menu',
	'integrate_register' => 'mentions_register',
);

foreach ($hooks as $hook => $function)
	add_integration_function($hook, $function);

$request = $smcFunc['db_query']('', '
	SELECT id_task FROM {db_prefix}scheduled_tasks WHERE task = {string:task}',
	array(
		'task' => 'removeMentions',
	)
);
if ($smcFunc['db_num_rows']($request) == 0)
	$smcFunc['db_insert']('replace',
		'{db_prefix}scheduled_tasks',
		array(
			'next_time' => 'int', 'time_offset' => 'int', 'time_regularity' => 'int',
			'time_unit' => 'string', 'disabled' => 'int', 'task' => 'string',
		),
		array(
			0, 0, 1, 'd', 1, 'removeMentions',
		),
		array('id_task')
	);
$smcFunc['db_free_result']($request);

if (!isset($modSettings['mentions_email_default']))
	updateSettings(array(
		'mentions_email_default' => 1,
		'mentions_remove_days' => 7,
	));