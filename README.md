# MCP HotPepper

A Model Context Protocol (MCP) server for searching Japanese restaurants using the HotPepper Gourmet API. This server provides three comprehensive search tools for finding restaurants by keyword, geographical area, and recommendations.

## Features

- 🍜 **Keyword Search**: Search by restaurant name, address, phone number, or keywords
- 🗾 **Area Search**: Search by geographical regions (service areas, large/middle/small areas)
- 🏆 **Recommendation Search**: Search by genre, budget, special categories, and features
- 🔧 **Comprehensive Filters**: Over 30 optional filters for facilities, amenities, and preferences
- ✅ **Type Safety**: Full TypeScript support with Zod validation
- 🛡️ **Error Handling**: Robust error handling and logging

## Prerequisites

- Node.js >= 20.0.0
- npm or yarn
- HotPepper Gourmet API key (get it from [HotPepper API](https://webservice.recruit.co.jp/register/))

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tongduyquang/mcp-hotpepper.git
   cd mcp-hotpepper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   HOTPEPPER_API_KEY=your_api_key_here
   ```

## Available Scripts

### Development

```bash
# Build the project
npm run build

# Build and make executable (automatically runs on npm install)
npm run prepare

# Watch mode for development (rebuilds on file changes)
npm run watch

# Format code with Prettier
npm run format

# Lint code with ESLint
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

### Testing

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Running the Server

```bash
# Run the built server
npm run serve

# Test the server with MCP Inspector (interactive testing)
npm run inspector
```

## Usage

### 1. Direct Command Line

After building, you can run the server directly:

```bash
# Run the built executable
node build/index.js

# Or use the npm script
npm run serve
```

### 2. Claude Desktop Integration

Add to your Claude Desktop `mcp_settings.json` file:

**Windows**: `%APPDATA%\Claude\mcp_settings.json`
**macOS**: `~/Library/Application Support/Claude/mcp_settings.json`
**Linux**: `~/.config/Claude/mcp_settings.json`

```json
{
  "mcpServers": {
    "mcp-hotpepper": {
      "command": "node",
      "args": ["C:/path/to/your/mcp-hotpepper/build/index.js"],
      "env": {
        "HOTPEPPER_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### 3. MCP Inspector (Recommended for Testing)

Use the built-in inspector to test your server interactively:

```bash
npm run inspector
```

This opens a web interface where you can:
- List available tools
- Test tool calls with different parameters
- View responses and debug issues

## Available Tools

### 1. `search_gourmets_by_keyword`

Search restaurants by keyword, name, address, phone number, or ID.

**Example usage:**
```json
{
  "keyword": "秋吉"
}
```

**Parameters:**
- `keyword` - Free text search (店名、住所、駅名など)
- `name` - Restaurant name (partial match)
- `id` - Restaurant ID (exact match)
- `tel` - Phone number (exact match, no hyphens)
- `address` - Address (partial match)
- Plus all common optional parameters

### 2. `search_gourmets_by_area`

Search restaurants by geographical area.

**Example usage:**
```json
{
  "large_service_area": "SS40",
  "wifi": 1,
  "count": 5
}
```

**Parameters:**
- `large_service_area` - Major service areas (SS10: 関東, SS20: 関西, etc.)
- `service_area` - Service area codes
- `large_area` - Large area codes  
- `middle_area` - Middle area codes
- `small_area` - Small area codes
- Plus all common optional parameters

### 3. `search_gourmets_by_recommend`

Search restaurants by recommendations and categories.

**Example usage:**
```json
{
  "genre": "G001",
  "budget": "B003"
}
```

**Parameters:**
- `genre` - Restaurant genre (G001: 居酒屋, G004: 和食, etc.)
- `budget` - Price range (B001: 1501～2000円, etc.)
- `special` - Special feature codes
- `special_category` - Special category codes
- Plus all common optional parameters

## Common Optional Parameters

All search tools support these optional filters:

### Pagination
- `count` (1-100) - Number of results to return
- `start` (≥1) - Starting position for results
- `order` (1-4) - Sort order (1: name kana, 2: genre, 3: area, 4: recommended)

### Facility Filters (0: no filter, 1: filter)
- `wifi` - WiFi available
- `private_room` - Private rooms available  
- `parking` - Parking available
- `card` - Credit cards accepted
- `non_smoking` - Non-smoking seats
- `lunch` - Lunch available
- `midnight` - Open after 23:00
- And 20+ more facility options...

### Other Filters
- `party_capacity` - Minimum party capacity
- `credit_card` - Specific credit card types (c01: VISA, c02: Master, etc.)
- `format` - Response format ('xml' or 'json')

## Error Handling

The server provides comprehensive error handling:

- **Validation Errors**: Invalid parameters are caught by Zod schemas
- **API Errors**: HotPepper API errors are properly formatted
- **Network Errors**: Connection issues are handled gracefully
- **Logging**: All errors are logged with context for debugging

## Development

### Project Structure

```
src/
├── index.ts              # Main entry point
├── server.ts             # MCP server setup
├── config.ts             # Configuration and environment
├── handlers.ts           # Tool request dispatching
├── errors.ts             # Error handling utilities
└── tools/
    ├── tools.ts          # Tool definitions (MCP schemas)
    ├── schemas.ts        # Zod validation schemas
    ├── search_by_keyword.ts    # Keyword search handler
    ├── search_by_area.ts       # Area search handler
    └── search_by_recommend.ts  # Recommendation search handler
```

### Adding New Features

1. **Add tool definition** in `src/tools/tools.ts`
2. **Add validation schema** in `src/tools/schemas.ts`  
3. **Create handler function** in `src/tools/`
4. **Register handler** in `src/handlers.ts`
5. **Build and test** with `npm run build && npm run inspector`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Run linting (`npm run lint:fix`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## API Reference

This server uses the [HotPepper Gourmet API](https://webservice.recruit.co.jp/doc/hotpepper/reference.html). Please refer to their documentation for detailed parameter descriptions and response formats.

## Troubleshooting

### Common Issues

1. **"API_KEY is not set"**
   - Make sure your `.env` file contains `HOTPEPPER_API_KEY=your_key`
   - Verify the API key is valid and active

2. **"Tool name must be a string"**
   - This usually indicates a build issue
   - Run `npm run build` to rebuild the project

3. **"Invalid params" errors**
   - Check parameter types match the schema (numbers vs strings)
   - Ensure at least one required parameter is provided for each tool

4. **Claude Desktop not showing tools**
   - Verify the `mcp_settings.json` path is correct
   - Check the absolute path to `build/index.js` is accurate
   - Restart Claude Desktop after configuration changes

### Getting Help

- Check the [issues page](https://github.com/tongduyquang/mcp-hotpepper/issues) for known problems
- Use `npm run inspector` to test tools interactively
- Enable debug logging by checking console output when running the server