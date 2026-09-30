/*
 * Creator: Playwright 1.62.0
 * Browser: chromium 151.0.7922.34
 */

import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {}

export default function main() {
  let response

  group(
    'page@90569824e7c4a693e764d75bee0e1880 - CMMA — Construction Manpower Management',
    function () {
      response = http.get('https://danis-cmma-dev.cosdevx.com/scheduling', {
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          priority: 'u=0, i',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'document',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'none',
          'sec-fetch-user': '?1',
          'upgrade-insecure-requests': '1',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling', {
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          priority: 'u=0, i',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'document',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'none',
          'sec-fetch-user': '?1',
          'upgrade-insecure-requests': '1',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0-8wgkz6yufop.css',
        {
          headers: {
            accept: 'text/css,*/*;q=0.1',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            priority: 'u=0',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'style',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0fg2fzd~.5k.i.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/14b-jbolxeyx..js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0hfw~zchjv985.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/031k8csq6~796.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/turbopack-0xe6_wk85l-mh.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0mkqz6sdmbk65.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0jvc2n6bc-391.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/12.04oas2f3vs.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/11z~edl8e6tkk.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0i.l9589uvx0j.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0_m7tf66bdvb5.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0tubory734icx.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0py2g23eeu85v.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0kf2awta.5cr5.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0o16275phax93.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0n7uk.z8y9lp0.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/favicon.ico?favicon.0x3dzn~oxb6tn.ico',
        {
          headers: {
            accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'image',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/auth/config?slug=danis-cmma-dev',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/auth/config?slug=danis-cmma-dev',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            'if-none-match': 'W/"1b7-7gu8upJGiNgQ+5g5BODWgnvTUJQ"',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get(
        'https://cmmadev.blob.core.windows.net/logo-uploads/logos/c5ce755a-c7c2-41eb-8ef2-e0c6ba342ac8.svg',
        {
          headers: {
            Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US,en;q=0.9',
            Connection: 'keep-alive',
            Host: 'cmmadev.blob.core.windows.net',
            Referer: 'https://danis-cmma-dev.cosdevx.com/',
            'Sec-Fetch-Dest': 'image',
            'Sec-Fetch-Mode': 'no-cors',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-Storage-Access': 'active',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          },
        }
      )

      response = http.post(
        'https://danis-cmma-dev.cosdevx.com/api/session/login',
        '{"email":"monalisa.badatya+1@costrategix.com","password":"Test@123","tenantSlug":"danis-cmma-dev","deviceFingerprint":"e0169f97-1c2b-453b-87e9-6cc19466eeb1"}',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            origin: 'https://danis-cmma-dev.cosdevx.com',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/mfa/verify?email=MONALISA.BADATYA%2B1%40COSTRATEGIX.COM&slug=danis-cmma-dev&_rsc=yJVSf2-mUsVl2a-v',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'next-router-state-tree':
              '%5B%22%22%2C%7B%22children%22%3A%5B%22login%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%2C0%5D%7D%2Cnull%2Cnull%2C0%5D%7D%2Cnull%2Cnull%2C16%5D',
            'next-url': '/login',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            rsc: '1',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0z96aibispj7h.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/14i1c7s68_.bq.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            referer: 'https://danis-cmma-dev.cosdevx.com/login?redirect=%2Fscheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/favicon.ico?favicon.0x3dzn~oxb6tn.ico',
        {
          headers: {
            accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            priority: 'u=1, i',
            referer:
              'https://danis-cmma-dev.cosdevx.com/mfa/verify?email=MONALISA.BADATYA%2B1%40COSTRATEGIX.COM&slug=danis-cmma-dev',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'image',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.post(
        'https://danis-cmma-dev.cosdevx.com/api/auth/mfa/send-code',
        '{"email":"MONALISA.BADATYA+1@COSTRATEGIX.COM","deviceFingerprint":"e0169f97-1c2b-453b-87e9-6cc19466eeb1","tenantSlug":"danis-cmma-dev"}',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            origin: 'https://danis-cmma-dev.cosdevx.com',
            priority: 'u=1, i',
            referer:
              'https://danis-cmma-dev.cosdevx.com/mfa/verify?email=MONALISA.BADATYA%2B1%40COSTRATEGIX.COM&slug=danis-cmma-dev',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.post(
        'https://danis-cmma-dev.cosdevx.com/api/session/mfa-verify',
        '{"email":"MONALISA.BADATYA+1@COSTRATEGIX.COM","deviceFingerprint":"e0169f97-1c2b-453b-87e9-6cc19466eeb1","code":"477339","tenantSlug":"danis-cmma-dev"}',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            origin: 'https://danis-cmma-dev.cosdevx.com',
            priority: 'u=1, i',
            referer:
              'https://danis-cmma-dev.cosdevx.com/mfa/verify?email=MONALISA.BADATYA%2B1%40COSTRATEGIX.COM&slug=danis-cmma-dev',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get('https://danis-cmma-dev.cosdevx.com/?_rsc=BP_0CeHdnEi_i1Kl', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-state-tree':
            '%5B%22%22%2C%7B%22children%22%3A%5B%22mfa%22%2C%7B%22children%22%3A%5B%22verify%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%2C0%5D%7D%2Cnull%2Cnull%2C0%5D%7D%2Cnull%2Cnull%2C0%5D%7D%2Cnull%2Cnull%2C16%5D',
          'next-url': '/mfa/verify',
          priority: 'u=1, i',
          referer:
            'https://danis-cmma-dev.cosdevx.com/mfa/verify?email=MONALISA.BADATYA%2B1%40COSTRATEGIX.COM&slug=danis-cmma-dev',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0mvq0gw-l2zuc.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer:
              'https://danis-cmma-dev.cosdevx.com/mfa/verify?email=MONALISA.BADATYA%2B1%40COSTRATEGIX.COM&slug=danis-cmma-dev',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0vco4d917t7dy.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer:
              'https://danis-cmma-dev.cosdevx.com/mfa/verify?email=MONALISA.BADATYA%2B1%40COSTRATEGIX.COM&slug=danis-cmma-dev',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0ol_ychnyuscr.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer:
              'https://danis-cmma-dev.cosdevx.com/mfa/verify?email=MONALISA.BADATYA%2B1%40COSTRATEGIX.COM&slug=danis-cmma-dev',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0q2cz8w9t95ti.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer:
              'https://danis-cmma-dev.cosdevx.com/mfa/verify?email=MONALISA.BADATYA%2B1%40COSTRATEGIX.COM&slug=danis-cmma-dev',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/04vlxnf7g3noa.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer:
              'https://danis-cmma-dev.cosdevx.com/mfa/verify?email=MONALISA.BADATYA%2B1%40COSTRATEGIX.COM&slug=danis-cmma-dev',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/148yup~n5heem.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer:
              'https://danis-cmma-dev.cosdevx.com/mfa/verify?email=MONALISA.BADATYA%2B1%40COSTRATEGIX.COM&slug=danis-cmma-dev',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/02zrx6_otchih.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer:
              'https://danis-cmma-dev.cosdevx.com/mfa/verify?email=MONALISA.BADATYA%2B1%40COSTRATEGIX.COM&slug=danis-cmma-dev',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0zlhvtyki2_qa.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer:
              'https://danis-cmma-dev.cosdevx.com/mfa/verify?email=MONALISA.BADATYA%2B1%40COSTRATEGIX.COM&slug=danis-cmma-dev',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/123_cs~91zl_o.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer:
              'https://danis-cmma-dev.cosdevx.com/mfa/verify?email=MONALISA.BADATYA%2B1%40COSTRATEGIX.COM&slug=danis-cmma-dev',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0eo2~s97uu55l.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer:
              'https://danis-cmma-dev.cosdevx.com/mfa/verify?email=MONALISA.BADATYA%2B1%40COSTRATEGIX.COM&slug=danis-cmma-dev',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0d-v1ryj~gk~3.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer:
              'https://danis-cmma-dev.cosdevx.com/mfa/verify?email=MONALISA.BADATYA%2B1%40COSTRATEGIX.COM&slug=danis-cmma-dev',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/favicon.ico?favicon.0x3dzn~oxb6tn.ico',
        {
          headers: {
            accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'image',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get('https://danis-cmma-dev.cosdevx.com/api/dashboard/overview', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          priority: 'u=1, i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          'x-tenant-slug': 'danis-cmma-dev',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/api/dashboard/comments', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          priority: 'u=1, i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          'x-tenant-slug': 'danis-cmma-dev',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/api/users/me/preferences', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          priority: 'u=1, i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/resource-trades?includeNonRequestable=false',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get('https://danis-cmma-dev.cosdevx.com/api/workforce?limit=1', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          priority: 'u=1, i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          'x-tenant-slug': 'danis-cmma-dev',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/api/system/labels', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          priority: 'u=1, i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          'x-tenant-slug': 'danis-cmma-dev',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/settings?_rsc=5CB68i4pnAekjehf', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_tree',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/admin?_rsc=5CB68i4pnAekjehf', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_tree',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/insights?_rsc=5CB68i4pnAekjehf', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_tree',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/reports?_rsc=5CB68i4pnAekjehf', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_tree',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/scheduling?_rsc=5CB68i4pnAekjehf', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_tree',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/resources?_rsc=5CB68i4pnAekjehf', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_tree',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/projects?_rsc=5CB68i4pnAekjehf', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_tree',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/settings?_rsc=7h4NYy5eoyMcNlUN', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_head',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/settings?_rsc=yIp22O3xgPPxC28X', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_index',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/workforce/assignment-change-requests?status=PENDING&limit=10',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/workforce/saved-views?featureKey=all',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/projects?filter=needing-attention&_rsc=5CB68i4pnAekjehf',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            'next-router-prefetch': '1',
            'next-router-segment-prefetch': '/_tree',
            'next-url': '/',
            priority: 'i',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            rsc: '1',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get('https://danis-cmma-dev.cosdevx.com/settings?_rsc=zZ7aKgXCxxeEeXr0', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/settings?_rsc=aobZvxIgTm8CTxMj', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/settings',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/settings?_rsc=_Yc9uVuDIsFddblI', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/settings/__PAGE__',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/projects?filter=needing-attention&_rsc=7h4NYy5eoyMcNlUN',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            'next-router-prefetch': '1',
            'next-router-segment-prefetch': '/_head',
            'next-url': '/',
            priority: 'i',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            rsc: '1',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/projects?filter=needing-attention&_rsc=ovuwaeB2NA2FiGK9',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            'next-router-prefetch': '1',
            'next-router-segment-prefetch': '/!KGFwcCk/projects',
            'next-url': '/',
            priority: 'i',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            rsc: '1',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/projects?filter=needing-attention&_rsc=hu5uIu7IetZacmBh',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            'next-router-prefetch': '1',
            'next-router-segment-prefetch': '/!KGFwcCk/projects/__PAGE__',
            'next-url': '/',
            priority: 'i',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            rsc: '1',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0cfp-sxfvbaj5.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get('https://danis-cmma-dev.cosdevx.com/admin?_rsc=7h4NYy5eoyMcNlUN', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_head',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/admin?_rsc=tZMc6tXDv2GEJ40B', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/admin',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/admin?_rsc=FzgvpUtA75RXi1T1', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/admin/__PAGE__',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0ph95pn~_j599.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/02mo1u700nwz1.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0ev-w1~o_3w95.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/03ltze2xhozdo.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get('https://danis-cmma-dev.cosdevx.com/insights?_rsc=7h4NYy5eoyMcNlUN', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_head',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/insights?_rsc=Cq3qx-_o2hSakg-w', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/insights',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/insights?_rsc=0xIRRLcOkkak00O9', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/insights/__PAGE__',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/1397-2ba297ju.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/01~.nfc_1od.6.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/110nv3f2whdoe.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/18bvn-qyrb8yb.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0pkv5md_f5ujy.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get('https://danis-cmma-dev.cosdevx.com/reports?_rsc=7h4NYy5eoyMcNlUN', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_head',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/reports?_rsc=PVXKehn9JgTPAxuI', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/reports',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/reports?_rsc=QkbTYIdjFoqSZAt7', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/reports/__PAGE__',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0fcyqak3m7n77.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/04gnww93tkxws.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/08qm.oibr_ry6.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get('https://danis-cmma-dev.cosdevx.com/scheduling?_rsc=7h4NYy5eoyMcNlUN', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_head',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/scheduling?_rsc=18CWVgUvHxNKSH1N', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/scheduling',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/scheduling?_rsc=nqPCImaiDUowGW07', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/scheduling/__PAGE__',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/09etely-mvohs.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/04ytcn3hohc5s.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/087-jezocls7z.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/043qi3t5_syf1.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0b9ya119aexhu.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get('https://danis-cmma-dev.cosdevx.com/resources?_rsc=7h4NYy5eoyMcNlUN', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_head',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/resources?_rsc=ykjrKEqKWPeZ9Vkr', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/resources',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/resources?_rsc=6ClDE3QbHJBBfQfu', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/resources/__PAGE__',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0k3sfha-hq7v7.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/009uqilt84kw9.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/13ymd4f5u492d.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0uupd1aqbyqe_.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/08s_.r7avyx.o.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0zkktpuz-b1-n.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/0~.razwkmvswn.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get('https://danis-cmma-dev.cosdevx.com/?_rsc=7h4NYy5eoyMcNlUN', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_head',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/?_rsc=lxbBaZJUjdur4gLV', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/__PAGE__',
          'next-url': '/',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/10kuig47v7b9a.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/08fonk0i85uo~.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/_next/static/chunks/12x_ln7zn8~m2.js',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            referer: 'https://danis-cmma-dev.cosdevx.com/',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/workforce/assignments/schedule-grid?startDate=2026-09-01&endDate=2026-12-08',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/resource-trades?includeNonRequestable=false',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            'if-none-match': 'W/"f3a3-zTy40FArt7IhS0TMO/7dWyXdqkQ"',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get('https://danis-cmma-dev.cosdevx.com/api/projects?limit=10000', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          priority: 'u=1, i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          'x-tenant-slug': 'danis-cmma-dev',
        },
      })

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/workforce/assignments/board?startDate=2026-09-01&endDate=2026-12-08',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            pragma: 'no-cache',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/workforce/saved-views?featureKey=workforce-schedule',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/favicon.ico?favicon.0x3dzn~oxb6tn.ico',
        {
          headers: {
            accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'image',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/workforce/assignments/schedule-grid?startDate=2026-09-01&endDate=2026-12-08',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            'if-none-match': 'W/"c8518-vGhiLvfFb2YGL4pQGq5f+69LRS8"',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/resource-trades?includeNonRequestable=false',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            'if-none-match': 'W/"f3a3-zTy40FArt7IhS0TMO/7dWyXdqkQ"',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get('https://danis-cmma-dev.cosdevx.com/api/projects?limit=10000', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'if-none-match': 'W/"34875-xH/3LAsdFB/mx4XVXRD+eepPHrQ"',
          priority: 'u=1, i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
          'x-tenant-slug': 'danis-cmma-dev',
        },
      })

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/workforce/assignments/board?startDate=2026-09-01&endDate=2026-12-08',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            pragma: 'no-cache',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/workforce/saved-views?featureKey=workforce-schedule',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            'if-none-match': 'W/"2-l9Fw4VUO7kr8CvBlt4zaMCqXZ0w"',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/workforce/b1936c57-fa90-4413-8bb0-0a433f49ab57',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.post(
        'https://danis-cmma-dev.cosdevx.com/api/settings/distance/calculate',
        '{"resourceId":"b1936c57-fa90-4413-8bb0-0a433f49ab57","projectId":"58530491-73ba-48df-bf0d-d9bc7693a56d"}',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            origin: 'https://danis-cmma-dev.cosdevx.com',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/workforce/assignments/45238d0e-36a9-4eb6-833c-160a28d12103/change-requests/pending',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/workforce/comments/ASSIGNMENT/45238d0e-36a9-4eb6-833c-160a28d12103',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            pragma: 'no-cache',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/workforce/comments/ASSIGNMENT/45238d0e-36a9-4eb6-833c-160a28d12103',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            pragma: 'no-cache',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/workforce/comments/ASSIGNMENT/45238d0e-36a9-4eb6-833c-160a28d12103',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            pragma: 'no-cache',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get('https://danis-cmma-dev.cosdevx.com/settings?_rsc=FawQ9ohA2OAOrSvV', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_tree',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/admin?_rsc=FawQ9ohA2OAOrSvV', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_tree',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/insights?_rsc=FawQ9ohA2OAOrSvV', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_tree',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/reports?_rsc=FawQ9ohA2OAOrSvV', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_tree',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/scheduling?_rsc=FawQ9ohA2OAOrSvV', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_tree',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/resources?_rsc=FawQ9ohA2OAOrSvV', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_tree',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/projects?_rsc=FawQ9ohA2OAOrSvV', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_tree',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/?_rsc=FawQ9ohA2OAOrSvV', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_tree',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/settings?_rsc=5Qa1wOF8Y1f8OymP', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_head',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/settings?_rsc=gu4gJuBSzSBUlKpr', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_index',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/settings?_rsc=166TZUckeRmcYgOB', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/settings?_rsc=K8kfVLUz20IPeOZB', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/settings',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/settings?_rsc=Tv9jkW8rC6GyuOVS', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/settings/__PAGE__',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/admin?_rsc=5Qa1wOF8Y1f8OymP', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_head',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/admin?_rsc=YhlK93sa3BRuShVf', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/admin',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/admin?_rsc=hrLg40s-g2cAyg0s', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/admin/__PAGE__',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/insights?_rsc=5Qa1wOF8Y1f8OymP', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_head',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/insights?_rsc=rLAKEQiuwUOeekjB', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/insights',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/insights?_rsc=4tFq2HZmgb8Prdrj', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/insights/__PAGE__',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/reports?_rsc=5Qa1wOF8Y1f8OymP', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_head',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/reports?_rsc=YsidXcS7HbVWX_je', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/reports',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/reports?_rsc=55icrJYTUvjYoiuo', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/reports/__PAGE__',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/scheduling?_rsc=5Qa1wOF8Y1f8OymP', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_head',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/scheduling?_rsc=cRnN3mQEv4JtFJOr', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/scheduling',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/scheduling?_rsc=ywSp5FzvzXOTe6eE', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/scheduling/__PAGE__',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/resources?_rsc=5Qa1wOF8Y1f8OymP', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_head',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/resources?_rsc=-gD5d2Uo09TueZH-', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/resources',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/resources?_rsc=znJ431s-TUxHCnbn', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/resources/__PAGE__',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/projects?_rsc=5Qa1wOF8Y1f8OymP', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_head',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/projects?_rsc=TkL02lHSnHk_Ui2R', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/projects',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/projects?_rsc=hA30Sonzb5kT-ce7', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/projects/__PAGE__',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/?_rsc=5Qa1wOF8Y1f8OymP', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/_head',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get('https://danis-cmma-dev.cosdevx.com/?_rsc=wY3vgcXo9E6War2E', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
          'next-router-prefetch': '1',
          'next-router-segment-prefetch': '/!KGFwcCk/__PAGE__',
          'next-url': '/scheduling',
          priority: 'i',
          referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
          rsc: '1',
          'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
        },
      })

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/workforce/61f54e4b-d859-49b5-a56d-a18ac3145ce4',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.post(
        'https://danis-cmma-dev.cosdevx.com/api/settings/distance/calculate',
        '{"resourceId":"61f54e4b-d859-49b5-a56d-a18ac3145ce4","projectId":"f9f7f54d-4404-473e-9bdd-1b02f8e472af"}',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            origin: 'https://danis-cmma-dev.cosdevx.com',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/workforce/assignments/5b4c09a2-da1e-4d05-91ee-225381fc8078/change-requests/pending',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/workforce/comments/ASSIGNMENT/5b4c09a2-da1e-4d05-91ee-225381fc8078',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            pragma: 'no-cache',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/workforce/comments/ASSIGNMENT/5b4c09a2-da1e-4d05-91ee-225381fc8078',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            pragma: 'no-cache',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )

      response = http.get(
        'https://danis-cmma-dev.cosdevx.com/api/workforce/comments/ASSIGNMENT/5b4c09a2-da1e-4d05-91ee-225381fc8078',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            cookie:
              'cmma_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmE3ZTAyNC04YTFlLTQ1NzktYmNiYi1hNjg5YWExMDE2N2IiLCJlbWFpbCI6Ik1PTkFMSVNBLkJBREFUWUErMUBDT1NUUkFURUdJWC5DT00iLCJmaXJzdF9uYW1lIjoiTU9OQUxJU0EiLCJsYXN0X25hbWUiOiJCQURBVFlBIiwicm9sZV9pZCI6ImNhMThjMGE0LTE4YmEtNGI4OS05ZTJiLWY2NTYyZGFjMTY4NiIsInJvbGUiOiJTeXN0ZW0gQWRtaW4iLCJyb2xlcyI6WyJTeXN0ZW0gQWRtaW4iXSwicm9sZV9pZHMiOlsiY2ExOGMwYTQtMThiYS00Yjg5LTllMmItZjY1NjJkYWMxNjg2Il0sInBlcm1pc3Npb25zIjpbInByb2plY3RzLmFyY2hpdmUiLCJwcm9qZWN0cy52aWV3LmFsbCIsInByb2plY3RzLnZpZXcubXkiLCJsYWJvcl9wbGFubmluZy52aWV3IiwibGFib3JfcGxhbm5pbmcudXBkYXRlIiwid29ya2ZvcmNlLmFzc2lnbiIsIndvcmtmb3JjZS51bmFzc2lnbiIsIndvcmtmb3JjZS52aWV3Iiwid29ya2ZvcmNlLmNyZWF0ZSIsIndvcmtmb3JjZS51cGRhdGUiLCJ3b3JrZm9yY2UuYXJjaGl2ZSIsInVzZXJzLnZpZXciLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy51cGRhdGUiLCJjYWxlbmRhcnMudmlldyIsInJlc291cmNlX3R5cGVzLnZpZXciLCJkYXNoYm9hcmRzLnZpZXciLCJtYW5hZ2Vfd29ya2VyX3BheSIsIm1hbmFnZV93b3JrZXJfY29udGFjdCIsImRpc21pc3NfaGVhbHRoX3dhcm5pbmdzIiwibWFuYWdlX3dvcmtlcl9hZGRyZXNzIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQub3ZlcnJpZGVfY29uZmxpY3QiLCJ3b3JrZm9yY2UudW5hdmFpbGFiaWxpdHkub3ZlcnJpZGVfY29uZmxpY3QiLCJsYWJvcl9wbGFubmluZy5vdmVycmlkZV9jb25mbGljdCIsIndvcmtmb3JjZS5yZXF1ZXN0LnVwZGF0ZSIsIndvcmtmb3JjZS5hc3NpZ25tZW50LmFwcHJvdmUiLCJhc3NpZ25tZW50cy5lZGl0IiwiYXNzaWdubWVudHMuc3BsaXQiLCJhc3NpZ25tZW50cy5yZWFzc2lnbiIsImFzc2lnbm1lbnRzLnVuYXNzaWduIiwiYXNzaWdubWVudHMub3ZlcnJpZGVfaGlzdG9yaWNfbG9ja291dCIsIndvcmtmb3JjZS52aWV3X3NlbnNpdGl2ZV9wYXlfZmllbGRzIiwiY29uZmxpY3RzLmFja25vd2xlZGdlIiwicHJvamVjdHMuY3JlYXRlIiwicHJvamVjdHMudXBkYXRlLmFsbCIsInByb2plY3RzLnVwZGF0ZS5teSIsInN5c3RlbV9zZXR0aW5ncy5tYW5hZ2UiLCJyZXNvdXJjZV90eXBlcy5tYW5hZ2UiLCJjYWxlbmRhcnMubWFuYWdlIiwicHJvamVjdC52aWV3X2RyYWZ0Iiwid29ya2Zsb3c6d3JpdGUiLCJyb2xlcy52aWV3Iiwicm9sZXMubWFuYWdlIiwicGVybWlzc2lvbnMubWFuYWdlIiwid29ya2ZvcmNlLmFzc2lnbm1lbnQucHJpdmlsZWdlZCJdLCJyZWdpb25faWQiOm51bGwsInRlbmFudF9zbHVnIjoiZGFuaXMtY21tYS1kZXYiLCJpYXQiOjE3ODg4NjUyMDIsImV4cCI6MTc4ODk1MTYwMn0.1hgoZkWyXoxu_GZtSiMHte3x_p9oefQ-gE6_dNgoEdg',
            pragma: 'no-cache',
            priority: 'u=1, i',
            referer: 'https://danis-cmma-dev.cosdevx.com/scheduling',
            'sec-ch-ua': '"Chromium";v="151", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
            'x-tenant-slug': 'danis-cmma-dev',
          },
        }
      )
    }
  )

  // Automatically added sleep
  sleep(1)
}
