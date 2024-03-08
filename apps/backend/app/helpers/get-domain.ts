const getDomainFromHost = (host?: string) => {
  if (!host) return undefined
  const ipAddressRegex =
    /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/i
  if (host.match(ipAddressRegex)) {
    return host.split(':')[0]
  }
  return host.split('.').slice(1).join('.').split(':')[0]
}

export default getDomainFromHost
