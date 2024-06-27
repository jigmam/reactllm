package com.reactllm;
import android.content.Context;
import android.content.SharedPreferences;
public class PreferencesUsers {

    private static final String PREFS_NAME = "MisPreferencias";
    private static final String PREF_PATH = "path";
    private static final String PREF_MAX_TOKENS = "maxTokens";
    private static final String PREF_RANDOM_SEED = "randomSeed";
    private static final String PREF_TEMPERATURE = "temperature";
    private static final String PREF_TOP_K = "topK";


    public static void guardarPreferencias(Context context, String path, int maxTokens, int randomSeed, float temperature, int topK) {
        SharedPreferences.Editor editor = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE).edit();
        editor.putString(PREF_PATH, path);
        editor.putInt(PREF_MAX_TOKENS, maxTokens);
        editor.putInt(PREF_RANDOM_SEED, randomSeed);
        editor.putFloat(PREF_TEMPERATURE, temperature);
        editor.putInt(PREF_TOP_K, topK);
        editor.apply();
    }
    public static String obtenerPath(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        ///data/local/tmp/llm/phi2_cpu.bin
        ///data/local/tmp/llm/model.bin
        return prefs.getString(PREF_PATH, "/data/local/tmp/llm/model-quantize.tflite"); // Valor por defecto si no se encuentra
    }

    public static int obtenerMaxTokens(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        return prefs.getInt(PREF_MAX_TOKENS, 1024); // Valor por defecto si no se encuentra
    }

    public static int obtenerRandomSeed(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        return prefs.getInt(PREF_RANDOM_SEED, 101); // Valor por defecto si no se encuentra
    }

    public static float obtenerTemperature(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        return prefs.getFloat(PREF_TEMPERATURE, 0.8f); // Valor por defecto si no se encuentra
    }

    public static int obtenerTopK(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        return prefs.getInt(PREF_TOP_K, 40); // Valor por defecto si no se encuentra
    }

}
