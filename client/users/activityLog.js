import { Template } from 'meteor/templating';
import { ActivityLog } from '../../lib/database/ActivityLog.js';

Template.activityLog.onCreated(function bodyOnCreated() {
  var self = this
  self.autorun(function() {
    self.subscribe('activitylog');
  })

//mark all notification as read
    Meteor.call('markNotificationsAsRead',
        (error, result) => {
            if (error) {
                console.error(error)
            }
        }
    );

});

Template.activityLog.onRendered( function () {
//console.log(ActivityLog.find({id}).fetch())
});

Template.activityLog.helpers({
  message(){
    return ActivityLog.find({type: "message"}, {sort: {time: -1 }});
  }
});

Template.messageitem.helpers({
  time() {
        return moment(this.time).fromNow();
      }
});
