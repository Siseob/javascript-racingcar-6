import { inputRacingCars, inputAttemps } from '../src/inputs';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (input) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    return Promise.resolve(input);
  });
};

describe('경주할 자동차 이름 입력', () => {
  test("inputRacingCars 메서드에 'pobi,woni'를 입력하고 'pobi,woni'를 반환", async () => {
    //given
    const input = 'pobi,woni';
    mockQuestions(input);

    //when
    const result = await inputRacingCars();

    //then
    expect(result).toBe('pobi,woni');
  });

  test('경주할 자동차 이름 입력 예외 테스트', async () => {
    // given
    const inputs = [
      '',
      'pobi',
      'pobi,pobi',
      'pobi,,jun',
      'pobi,woni,',
      'pobi,woni,junnnn',
    ];

    // when & then
    inputs.forEach(async (input) => {
      mockQuestions(input);
      await expect(inputRacingCars()).rejects.toThrow(
        '[ERROR] Invalid racing car input'
      );
    });
  });
});

describe('시도 횟수 입력', () => {
  test('inputAttemps 메서드에 1을 입력하고, 1을 반환', async () => {
    //given
    const input = '1';
    mockQuestions(input);

    //when
    const result = await inputAttemps();

    //then
    expect(result).toBe('1');
  });

  test('시도 횟수 입력 예외 테스트', async () => {
    // given
    const inputs = ['0', '', '-1', 'one', '1a2'];
    // mockQuestions(inputs);

    // when & then
    inputs.forEach(async (input) => {
      mockQuestions(input);
      await expect(inputAttemps()).rejects.toThrow(
        '[ERROR] Invalid number of attemps input'
      );
    });
  });
});