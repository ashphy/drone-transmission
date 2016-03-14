/*global $, jsyaml */
'use strict';

function toBuild(original) {
  let build = {};
  if(original.image) {
    build.image = original.image;
  }

  if(original.script) {
    build.commands = original.script;
  }

  if(original.env) {
    build.environment = original.env;
  }

  return build;
}

function toCache(original) {
  let cache;
  if(original.cache) {
    cache = { mount: original.cache };
  }
  return cache;
}

function toIrc(irc) {
  return {
    nick: irc.nick,
    channel: irc.channel,
    server: {
      host: irc.server
    }
  };
}

function toNotifiy(original) {
  let notify = {};
  if(original.notify) {
    const origNotify = original.notify;
    if(origNotify.irc) {
      notify.irc = toIrc(origNotify.irc);
    }
  }
  return notify;
}

function convert3to4(original) {
  let yml = {};
  yml.build = toBuild(original);

  const cache = toCache(original);
  if(cache) {
    yml.cache = cache;
  }

  const notify = toNotifiy(original);
  if(notify) {
    yml.notify = notify;
  }

  return yml;
}

$('#original').on('change', function() {
  const original = $(this).val();
  console.log(convert3to4(jsyaml.safeLoad(original)));
  $('#converted').text(jsyaml.safeDump(convert3to4(jsyaml.safeLoad(original))));
});
