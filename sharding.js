const { ShardingManager } = require('kurasuta');
const { join } = require('path');
const sharder = new ShardingManager(join(__dirname, 'index'),{	
});

sharder.spawn();