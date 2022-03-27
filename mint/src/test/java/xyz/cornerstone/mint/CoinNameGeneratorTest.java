package xyz.cornerstone.mint;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static com.google.common.truth.Truth.assertThat;

class CoinNameGeneratorTest {

    @Test
    @DisplayName("Coin name is generated")
    void coinNameGenerated() {
        // given
        CoinNameGenerator generator = new CoinNameGenerator();

        // when
        String result = generator.generateRandomName();

        // then
        assertThat(result).contains("Coin");
    }

}