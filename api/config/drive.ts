/**
 * Config source: https://git.io/JBt3o
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import {DriveConfig} from '@ioc:Adonis/Core/Drive'

/*
|--------------------------------------------------------------------------
| Drive Config
|--------------------------------------------------------------------------
|
| The `DriveConfig` relies on the `DisksList` interface which is
| defined inside the `contracts` directory.
|
*/
const driveConfig: DriveConfig = {
  /*
  |--------------------------------------------------------------------------
  | Default disk
  |--------------------------------------------------------------------------
  |
  | The default disk to use for managing file uploads. The value is driven by
  | the `DRIVE_DISK` environment variable.
  |
  */
  disk: Env.get('DRIVE_DISK'),

  disks: {
    /*
    |--------------------------------------------------------------------------
    | Local
    |--------------------------------------------------------------------------
    |
    | Uses the local file system to manage files. Make sure to turn off serving
    | files when not using this disk.
    |
    */
    local: {
      driver: 'local',
      visibility: 'public',
      basePath: './',
      /*
      |--------------------------------------------------------------------------
      | Storage root - Local driver only
      |--------------------------------------------------------------------------
      |
      | Define an absolute path to the storage directory from where to read the
      | files.
      |
      */
      root: './public/assets/',

      /*
      |--------------------------------------------------------------------------
      | Serve files - Local driver only
      |--------------------------------------------------------------------------
      |
      | When this is set to true, AdonisJS will configure a files server to serve
      | files from the disk root. This is done to mimic the behavior of cloud
      | storage services that has inbuilt capabilities to serve files.
      |
      */
      serveFiles: true,
    },
  },
}

export default driveConfig
