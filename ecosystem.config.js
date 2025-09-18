module.exports = {
  apps: [{
    name: 'xingjuai-website',
    script: './server.js',
    cwd: '/www/wwwroot/xingjuai.icu/companywebxjys',
    instances: 2, // 可以根据服务器CPU核心数调整
    exec_mode: 'cluster',
    
    // 环境变量
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      // 添加其他必要的环境变量
    },
    
    // 日志配置
    error_file: '../logs/err.log',
    out_file: '../logs/out.log',
    log_file: '../logs/combined.log',
    time: true,
    
    // 性能配置
    max_memory_restart: '1G', // 内存超过1G时重启
    min_uptime: '10s', // 最小运行时间
    max_restarts: 10, // 最大重启次数
    
    // 监控配置
    watch: false, // 生产环境不建议开启文件监控
    ignore_watch: [
      'node_modules',
      '.next',
      'logs',
      '.git'
    ],
    
    // 进程管理
    kill_timeout: 5000, // 强制杀死进程的超时时间
    listen_timeout: 3000, // 监听超时时间
    
    // 自动重启配置
    autorestart: true,
    
    // 合并日志
    merge_logs: true,
    
    // 实例间负载均衡
    instance_var: 'INSTANCE_ID'
  }],
  
  // 部署配置（可选）
  deploy: {
    production: {
      user: 'www',
      host: ['xingjuai.icu'],
      ref: 'origin/main',
      repo: 'git@github.com:your-username/your-repo.git', // 替换为实际的Git仓库地址
      path: '/www/wwwroot/xingjuai.icu',
      'post-deploy': 'cd companywebxjys && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'apt update && apt install git -y'
    }
  }
}