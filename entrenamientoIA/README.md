# 🤖 Entrenamiento IA - ProcureData

Este directorio contiene todos los documentos necesarios para entrenar el asistente virtual ARIA de ProcureData.

> **Última actualización**: 2026-01-06  
> **Versión**: 1.0

---

## 📋 Índice de Documentos

| Archivo | Descripción | Uso Principal |
|---------|-------------|---------------|
| `01_SYSTEM_INSTRUCTIONS.md` | Instrucciones completas para el System Prompt | Google AI Studio, Claude, GPT |
| `02_KNOWLEDGE_BASE.md` | Base de conocimiento consolidada del negocio | Contexto adicional |
| `03_SERVICES_CATALOG.md` | Catálogo completo de 21+ servicios | Referencia de precios y funcionalidades |
| `04_DATA_ARCHITECTURE.md` | Esquema de datos y contratos | Entender estructura de la app |
| `05_INTERACTIVE_WIDGETS.md` | Documentación de widgets gamificados | Guiar usuarios a simuladores |
| `06_RESPONSE_RULES.md` | Reglas de respuesta y frases sugeridas | Comportamiento de ARIA |
| `07_CONSTANTS_REFERENCE.md` | Constantes oficiales (sectores, precios) | Datos invariantes |

---

## 🚀 Cómo Usar estos Documentos

### Para Google AI Studio

1. Crea un nuevo chat o prompt
2. Copia el contenido completo de `01_SYSTEM_INSTRUCTIONS.md`
3. Pégalo en el campo "System Instructions"
4. Opcionalmente, añade `02_KNOWLEDGE_BASE.md` como contexto adicional

### Para Lovable AI (ya implementado)

Los contenidos están compilados en la Edge Function:
```
supabase/functions/chat-ai/index.ts
```

Esta función usa `LOVABLE_API_KEY` (auto-provisionada) para llamar a `google/gemini-2.5-flash`.

### Para Claude o ChatGPT

1. Copia `01_SYSTEM_INSTRUCTIONS.md` como mensaje inicial
2. Usa los demás documentos como referencia cuando sea necesario

---

## 📂 Estructura de Contenido

```
entrenamientoIA/
├── README.md                      ← Este archivo (índice)
├── 01_SYSTEM_INSTRUCTIONS.md      ← System Prompt completo para ARIA
├── 02_KNOWLEDGE_BASE.md           ← Contexto de negocio (problema nxm, modelo tripartito)
├── 03_SERVICES_CATALOG.md         ← 21 servicios con precios y descripciones
├── 04_DATA_ARCHITECTURE.md        ← Esquema de tablas Supabase
├── 05_INTERACTIVE_WIDGETS.md      ← Widgets gamificados y simuladores
├── 06_RESPONSE_RULES.md           ← 10 reglas de comportamiento de ARIA
└── 07_CONSTANTS_REFERENCE.md      ← Sectores, precios, stack europeo
```

---

## 🔄 Mantenimiento

Cuando se añadan nuevas funcionalidades a la aplicación:

1. Actualizar el documento correspondiente en esta carpeta
2. Sincronizar con `supabase/functions/chat-ai/index.ts` si afecta al chatbot
3. Verificar que `docs/ai_training_context.md` refleje los cambios

---

## 📌 Fuentes Originales

Estos documentos se extraen y consolidan de:

- `docs/ai_training_context.md` - Training context principal
- `docs/synthetic_data.md` - Arquitectura de datos sintéticos
- `docs/ContextDocument.md` - Documento de contexto maestro
- `docs/DOCUMENTO_TECNICO.md` - Especificación técnica v3.1
- `src/lib/constants.ts` - Constantes oficiales del código

---

## 🏷️ Etiquetas para Búsqueda

`ARIA` `chatbot` `IA` `training` `ProcureData` `Gaia-X` `IDSA` `proveedores` `sostenibilidad` `blockchain`
