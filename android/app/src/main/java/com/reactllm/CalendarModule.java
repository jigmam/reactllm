package com.reactllm; // replace your-apps-package-name with your app’s package name

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.mediapipe.tasks.genai.llminference.LlmInference;

import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.MappedByteBuffer;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import kotlin.jvm.Throws;


public class CalendarModule extends ReactContextBaseJavaModule {

    LlmInference llmInference;
    ReactApplicationContext context;
    LlmInference.LlmInferenceOptions options;

    CalendarModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
        String path = PreferencesUsers.obtenerPath(this.context);
        int maxTokens = PreferencesUsers.obtenerMaxTokens(this.context);
        int randomSeed = PreferencesUsers.obtenerRandomSeed(this.context);
        float temperature = PreferencesUsers.obtenerTemperature(this.context);
        int topK = PreferencesUsers.obtenerTopK(this.context);
        path ="/data/local/tmp/llm/gemma.task";
        loadLLM(path, maxTokens, randomSeed, temperature, topK);

        //           llmInference.generateResponse(instruction);

    }

    @NonNull
    @Override
    public String getName() {
        return "CalendarModule";
    }

    @ReactMethod
    public void createCalendarEvent(String prompt,  Promise promise) {
        try{
            String input = "Eres un asistente útil con acceso a las siguientes funciones. Úselos si es necesario. \"functions\":[{'name': 'fnt_buscar_web', 'description': 'el usuario solicita una busqueda en internet.', 'parameters': [{'description': 'busqueda especifica.', 'name': 'busqueda', 'required': False, 'type': 'string'}, {'description': 'página especifica para la busqueda', 'name': 'sitio', 'required': False, 'type': 'string'}]}, {'name': 'fnt_buscar_lugares', 'description': 'el usuario solicita la ubicación de un lugar.', 'parameters': [{'description': 'lugar especifico.', 'name': 'lugar', 'required': True, 'type': 'string'}, {'description': 'ubicación del lugar', 'name': 'ubicación', 'required': False, 'type': 'string'}]}, {'name': 'fnt_enviar_mensajes', 'description': 'el usuario desea enviar un mensaje.', 'parameters': [{'description': 'el usuario especifica a quien enviar el mensaje.', 'name': 'destinatario', 'required': True, 'type': 'string'}, {'description': 'contenido que desea enviar el usuario', 'name': 'mensaje', 'required': True, 'type': 'string'}]}, {'name': 'fnt_crear_archivo', 'description': 'el usuario desea crear un archivo.', 'parameters': [{'description': 'el usuario especifica el nombre del archivo.', 'name': 'nombre', 'required': False, 'type': 'string'}, {'description': 'ubicación donde se creará el archivo', 'name': 'ubicación', 'required': False, 'type': 'string'}, {'description': 'extensión del archivo', 'name': 'extensión', 'required': False, 'type': 'string'}]}, {'name': 'fnt_establecer_alarma', 'description': 'el usuario desea una alarma o recordatorio', 'parameters': [{'description': 'el usuario especifica el nombre de la alarma.', 'name': 'nombre', 'required': False, 'type': 'string'}, {'description': 'hora de la alarma', 'name': 'hora', 'required': True, 'type': 'string'}, {'description': 'día que se activará la alarma', 'name': 'día', 'required': False, 'type': 'string'}]}, {'name': 'fnt_guardar_valores', 'description': 'el usuario solicita almacenar valores.', 'parameters': [{'description': 'valor a almacenar.', 'name': 'valor', 'required': True, 'type': 'string'}, {'description': 'lugar de almacenamiento', 'name': 'lugar', 'required': False, 'type': 'string'}]}, {'name': 'fnt_clima', 'description': 'el usuario solicita el clima', 'parameters': [{'description': 'ubicación donde se solicita el clima.', 'name': 'ubicacion', 'required': True, 'type': 'string'}]}, {'name': 'fnt_significado', 'description': 'el usuario solicita el significado de una palabra', 'parameters': [{'description': 'palabra solicitada.', 'name': 'palabra', 'required': True, 'type': 'string'}]}, {'name': 'fnt_programa', 'description': 'el usuario solicita un programa.', 'parameters': [{'description': 'nombre del programa solicitado.', 'name': 'programa', 'required': True, 'type': 'string'}]}] ";
            String prompting =  input + prompt;
            System.out.println(prompting);
            String result = llmInference.generateResponse(prompt);
            Log.d("CalendarModule", result);
            promise.resolve(result);
        } catch(Exception e) {
            promise.reject("Create Event Error", e);
        }
    }



    @ReactMethod
    public void loadLLM(String path, int maxTokens, int randomSeed, float temperature, int topK){
        System.out.println(path);
        this.options = LlmInference.LlmInferenceOptions.builder()
                .setModelPath(path)
                .setMaxTokens(1200)
                .build();
        PreferencesUsers.guardarPreferencias(context, path, maxTokens, randomSeed, temperature, topK);
        llmInference = LlmInference.createFromOptions(context, options);
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("DEFAULT_EVENT_NAME", "New Event");
        return constants;
    }

}