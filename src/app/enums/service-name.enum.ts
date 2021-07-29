export enum ServiceName {
  Afp = 'afp',
  DynamicDns = 'dynamicdns',
  Ftp = 'ftp',
  Gluster = 'glusterd',
  Iscsi = 'iscsitarget',
  Lldp = 'lldp',
  Nfs = 'nfs',
  OpenVpnClient = 'openvpn_client',
  OpenVpnServer = 'openvpn_server',
  Rsync = 'rsync',
  S3 = 's3',
  Smart = 'smartd',
  Snmp = 'snmp',
  Ssh = 'ssh',
  Cifs = 'cifs',
  Tftp = 'tftp',
  Ups = 'ups',
  WebDav = 'webdav',
  Http = 'http',
  Kubernetes = 'kubernetes',
}

export const serviceNames = new Map<ServiceName, string>([
  [ServiceName.Afp, 'AFP'],
  [ServiceName.DynamicDns, 'Dynamic DNS'],
  [ServiceName.Ftp, 'FTP'],
  [ServiceName.Gluster, 'Gluster'],
  [ServiceName.Iscsi, 'iSCSI'],
  [ServiceName.Lldp, 'LLDP'],
  [ServiceName.Nfs, 'NFS'],
  [ServiceName.OpenVpnClient, 'OpenVPN Client'],
  [ServiceName.OpenVpnServer, 'OpenVPN Server'],
  [ServiceName.Rsync, 'Rsync'],
  [ServiceName.S3, 'S3'],
  [ServiceName.Smart, 'S.M.A.R.T.'],
  [ServiceName.Snmp, 'SNMP'],
  [ServiceName.Ssh, 'SSH'],
  [ServiceName.Cifs, 'SMB'],
  [ServiceName.Tftp, 'TFTP'],
  [ServiceName.Ups, 'UPS'],
  [ServiceName.WebDav, 'WebDAV'],
]);
