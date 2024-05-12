export interface ServerState {
    online: boolean
    host: string
    port: number
    ip_address: string
    eula_blocked: boolean
    retrieved_at: number
    expires_at: number
    srv_record: any
    version: Version
    players: Players
    motd: Motd
    icon: string
    mods: any[]
    software: any
    plugins: any[]
  }
  
  export interface Version {
    name_raw: string
    name_clean: string
    name_html: string
    protocol: number
  }
  
  export interface Players {
    online: number
    max: number
    list: any[]
  }
  
  export interface Motd {
    raw: string
    clean: string
    html: string
  }
  