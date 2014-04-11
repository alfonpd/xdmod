/**
 * ARR status active tasks store.
 *
 * @author Jeffrey T. Palmer <jtpalmer@ccr.buffalo.edu>
 */

Ext.namespace('XDMoD', 'XDMoD.Arr');

XDMoD.Arr.ActiveTasksStore = Ext.extend(Ext.data.JsonStore, {
    url: 'controllers/arr.php',

    listeners: {
        exception: function (misc) {
            console.log(misc);
        }
    },

    constructor: function (config) {
        config = config || {};

        var nowEpoch = Date.now();

        Ext.apply(config, {
            baseParams: {
                operation: 'get_active_tasks'
            },

            root: 'response',
            idProperty: 'task_id',
            messageProperty: 'message',
            successProperty: 'success',
            totalProperty: 'count',

            fields: [
                {
                    name: 'task_id',
                    type: 'int'
                },
                {
                    name: 'next_check_time',
                    type: 'date',
                    dateFormat: 'Y-m-d H:i:s'
                },
                {
                    name: 'status',
                    type: 'string'
                },
                {
                    name: 'statusinfo',
                    type: 'string'
                },
                {
                    name: 'statusupdatetime',
                    type: 'date',
                    dateFormat: 'Y-m-d H:i:s'
                },
                {
                    name: 'datetimestamp',
                    type: 'string'
                },
                {
                    name: 'time_activated',
                    type: 'date',
                    dateFormat: 'Y-m-d H:i:s'
                },
                {
                    name: 'time_submitted_to_queue',
                    type: 'date',
                    dateFormat: 'Y-m-d H:i:s'
                },
                {
                    name: 'time_in_queue',
                    type: 'int',
                    convert: function (value, record) {
                        var timeSubmitted = record.time_submitted_to_queue;

                        if (timeSubmitted === null) {
                            return 0;
                        }

                        return nowEpoch - Date.parseDate(timeSubmitted, 'Y-m-d H:i:s').getTime();
                    }
                },
                {
                    name: 'task_lock',
                    type: 'int'
                },
                {
                    name: 'time_to_start',
                    type: 'date',
                    dateFormat: 'Y-m-d H:i:s'
                },
                {
                    name: 'repeat_in',
                    type: 'string'
                },
                {
                    name: 'resource',
                    type: 'string'
                },
                {
                    name: 'app',
                    type: 'string'
                },
                {
                    name: 'resource_param',
                    type: 'string'
                },
                {
                    name: 'app_param',
                    type: 'string'
                },
                {
                    name: 'task_param',
                    type: 'string'
                },
                {
                    name: 'group_id',
                    type: 'string'
                },
                {
                    name: 'FatalErrorsCount',
                    type: 'int'
                },
                {
                    name: 'FailsToSubmitToTheQueue',
                    type: 'int'
                },
                {
                    name: 'ncpus',
                    type: 'int',
                    convert: function (value, record) {
                        return Ext.decode(record.resource_param).ncpus;
                    }
                }
            ]
        });

        XDMoD.Arr.ActiveTasksStore.superclass.constructor.call(this, config);
    }
});

