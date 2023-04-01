import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { decodeCaptcha } from './helpers/decode-captcha';

describe("Initial test", () => {
  it('Should work', () => {
    const a = 1 + 1;
    const b = 2;
    assert.deepEqual(a, b)
  })

  it("should read the captcha", async () => {
    // const fileBuffer = readFileSync('/tmp/captcha.png')
    const fileBuffer = readFileSync('tmp/captcha.png')
    const captcha = (await decodeCaptcha(fileBuffer)).replace(/\n/g, "")
    assert.equal(captcha, 'aowD')
  })
})