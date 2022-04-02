package xyz.cornerstone.mint;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;

import java.io.IOException;
import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Random;

public class CoinNameGenerator {
    public static final int MAX_NAME_SUFFIX = 10000;
    private final List<String> prefixes;
    private final Random rnd;

    public CoinNameGenerator() {
        rnd = new Random();

        URL url = Resources.getResource("name-prefixes.list");
        try {
            String content = Resources.toString(url, Charsets.UTF_8);
            prefixes = Arrays.asList(content.split("\n"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    String generateRandomName() {
        int randomSuffix = rnd.nextInt(MAX_NAME_SUFFIX);
        int randomPos = rnd.nextInt(prefixes.size());
        String randomName = prefixes.get(randomPos);
        String firstLetter = randomName.substring(0, 1).toUpperCase();
        String remainder = randomName.substring(1);
        return firstLetter + remainder + "Coin" + String.format("%04d", randomSuffix);
    }

}
