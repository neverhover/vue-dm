/**
 * Created by blood on 2017/7/18.
 */

const template = {
  'tun_syslog': {
    'enabled': {
      'type': 'boolean',
      'key': 'enabled',
      'default': false,
      'spec': {
        'show': true
      }
    },
    'ipaddr': {
      'key': 'ipaddr',
      'default': '127.0.0.1',
      'type': 'ipv4_address',
      'spec': {
        'show': true,
        'required': true
      }
    },
    'port': {
      'key': 'port',
      'default': 514,
      'type': 'number',
      'spec': {
        'show': true,
        'required': true,
        'range': {
          'min': 1,
          'max': 65535
        }
      }
    }
  },
  'sys_syslog': {
    'enabled': {
      'type': 'boolean',
      'key': 'enabled',
      'default': false,
      'spec': {
        'show': true
      }
    },
    'ipaddr': {
      'key': 'ipaddr',
      'default': '127.0.0.1',
      'type': 'ipv4_address',
      'spec': {
        'show': true,
        'required': true
      }
    },
    'port': {
      'key': 'port',
      'default': 514,
      'type': 'number',
      'spec': {
        'show': true,
        'required': true,
        'range': {
          'min': 1,
          'max': 65535
        }
      }
    },
    'level': {
      'key': 'level',
      'default': 'info',
      'type': 'string',
      'list': [
        'debug',
        'info',
        'notice',
        'warn',
        'err',
        'crit',
        'alert',
        'emerg'
      ],
      'spec': {
        'show': true
      }
    }
  },
  'tun_syslog1000': {
    'enabled': {
      'type': 'boolean',
      'key': 'enabled',
      'default': false,
      'spec': {
        'show': true
      }
    },
    'ipaddr': {
      'key': 'ipaddr',
      'default': '127.0.0.1',
      'type': 'ipv4_address',
      'spec': {
        'show': true,
        'required': true
      }
    },
    'port': {
      'key': 'port',
      'default': 514,
      'type': 'number',
      'spec': {
        'show': true,
        'required': true,
        'range': {
          'min': 1,
          'max': 65535
        }
      }
    }
  }
}

const schema = {
  tun_syslog: {
    enabled: false,
    ipaddr: '127.0.0.1',
    port: 514
  },
  sys_syslog: {
    enabled: false,
    ipaddr: '127.0.0.1',
    port: 514,
    level: 'info'
  },
  tun_syslog1000: {
    enabled: false,
    ipaddr: '127.0.0.1',
    port: 77777,
    level: 'info'
  }
}

export default {
  template: template,
  schema: schema
}
