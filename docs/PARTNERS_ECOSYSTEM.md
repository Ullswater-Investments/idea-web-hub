# PROCUREDATA - Ecosistema de Partners Estratégicos UE

> Documento de referencia completo para el ecosistema de colaboración estratégica en la Unión Europea

---

## Metadatos del Documento

| Campo | Valor |
|-------|-------|
| **Versión** | 1.0 |
| **Fecha** | 2026-01-10 |
| **Total Partners** | 70 |
| **Países** | 7 |
| **Asociaciones** | 35 |
| **Clústeres** | 35 |

---

## Tabla de Contenidos

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Modelo de Datos](#2-modelo-de-datos)
3. [Partners por País](#3-partners-por-país)
   - [España](#31-españa-)
   - [Alemania](#32-alemania-)
   - [Italia](#33-italia-)
   - [Francia](#34-francia-)
   - [Países Bajos](#35-países-bajos-)
   - [Portugal](#36-portugal-)
   - [Bélgica](#37-bélgica-)
4. [Distribución por Sector](#4-distribución-por-sector)
5. [Distribución por Prioridad](#5-distribución-por-prioridad)
6. [Sistema de Iconografía](#6-sistema-de-iconografía)
7. [Sistema de Badges y Estados](#7-sistema-de-badges-y-estados)
8. [Datos JSON Exportables](#8-datos-json-exportables)
9. [Notas de Implementación](#9-notas-de-implementación)

---

## 1. Resumen Ejecutivo

### Descripción del Ecosistema

PROCUREDATA ha construido un ecosistema estratégico de **70 partners** distribuidos en **7 países** de la Unión Europea. Este ecosistema está diseñado para maximizar el alcance y la capacidad de recopilación de datos de calidad en el mercado europeo de compras B2B.

### Filosofía del Ecosistema

El ecosistema se estructura en **tres capas complementarias**:

1. **Asociaciones Sectoriales (35)**: Organizaciones que agrupan a empresas de un sector específico. Proporcionan acceso a redes de proveedores y estándares sectoriales.

2. **Clústeres Empresariales (35)**: Polos de innovación y distritos industriales. Concentran a las empresas líderes, institutos de investigación y organismos certificadores ("Dueños del Dato").

3. **Futura Capa - Partners Tecnológicos**: Integradores de sistemas y plataformas tecnológicas (planificada).

### Estadísticas Globales

| Métrica | Valor |
|---------|-------|
| **Total Partners** | 70 |
| **Países cubiertos** | 7 |
| **Asociaciones sectoriales** | 35 (50%) |
| **Clústeres empresariales** | 35 (50%) |
| **Partners activos** | 2 (3%) |
| **Partners en desarrollo** | 26 (37%) |
| **Partners próximamente** | 42 (60%) |
| **Prioridad inmediata** | 13 (19%) |
| **Masa crítica** | 22 (31%) |
| **Quick win** | 16 (23%) |

---

## 2. Modelo de Datos

### Interfaz Partner (TypeScript)

```typescript
interface Partner {
  id: string;                    // Identificador único (slug)
  name: string;                  // Nombre corto para UI
  fullName?: string;             // Nombre oficial completo
  description: string;           // Descripción detallada (40-100 palabras)
  logo: string | null;           // Ruta al archivo de logo (null si no disponible)
  link: string;                  // Ruta interna de navegación
  status: "activo" | "próximamente" | "en desarrollo";
  sector: string;                // Sector industrial principal
  hasDocTecnico?: boolean;       // Si tiene documentación técnica disponible
  keyInitiative?: string;        // Iniciativa o proyecto clave
  priority?: "inmediato" | "masa_critica" | "quick_win";
  type?: "asociación" | "clúster";
}

interface CountryData {
  name: string;                  // Nombre del país
  flag: string;                  // Emoji de bandera
  partners: Partner[];           // Array de partners del país
}
```

### Campos Detallados

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | string | ✅ | Identificador único en formato slug (ej: `aerospace-valley`) |
| `name` | string | ✅ | Nombre corto para mostrar en tarjetas (ej: `GAIA`) |
| `fullName` | string | ❌ | Nombre oficial completo de la organización |
| `description` | string | ✅ | Descripción detallada del partner y su valor estratégico |
| `logo` | string/null | ✅ | Ruta relativa al logo o null si no disponible |
| `link` | string | ✅ | Ruta de navegación interna (ej: `/partners/itbid/proyecto`) |
| `status` | enum | ✅ | Estado actual de la relación |
| `sector` | string | ✅ | Sector industrial principal |
| `hasDocTecnico` | boolean | ❌ | Indica si tiene documentación técnica disponible |
| `keyInitiative` | string | ❌ | Proyecto o iniciativa clave del partner |
| `priority` | enum | ❌ | Prioridad estratégica de activación |
| `type` | enum | ❌ | Tipo de organización (asociación o clúster) |

---

## 3. Partners por País

---

### 3.1 España 🇪🇸

**Total: 10 partners** (5 asociaciones + 5 clústeres)

#### Asociaciones Sectoriales (5)

| ID | Nombre | Nombre Completo | Sector | Status | Prioridad | Iniciativa Clave |
|----|--------|-----------------|--------|--------|-----------|------------------|
| `itbid` | ITBID | - | Sector Público | activo | - | - |
| `aerce` | AERCE | Asociación Española de Profesionales de Compras, Contratación y Aprovisionamientos | Compras Profesionales | en desarrollo | masa_critica | Certificación CPO, Foro de Compras |
| `bme-espana` | BME España | Bundesverband Materialwirtschaft, Einkauf und Logistik (Delegación España) | Compras y Logística | próximamente | quick_win | BME Symposium, Estándares EU |
| `asaja` | ASAJA | Asociación Agraria de Jóvenes Agricultores | Agricultura | próximamente | quick_win | Kit Digital, PAC digital |
| `feique` | FEIQUE | Federación Empresarial de la Industria Química Española | Química | próximamente | quick_win | Competitividad internacional, I+D |

**Descripciones Detalladas:**

**ITBID**
> Plataforma líder de licitaciones públicas en España. Conecta a proveedores con oportunidades de contratación del sector público, facilitando el acceso a datos de compras gubernamentales.

**AERCE**
> Principal asociación profesional de compras en España con +3.000 miembros. Ofrece certificación CPO (Chief Procurement Officer) y organiza el Foro de Compras, evento de referencia del sector. Clave para acceder a la red de directores de compras de grandes empresas españolas.

**BME España**
> Delegación española de la mayor asociación de compras de Alemania. Promueve estándares europeos de procurement y organiza el BME Symposium en España. Puente estratégico con el mercado alemán y sus mejores prácticas.

**ASAJA**
> La mayor organización agraria de España con presencia en todas las comunidades autónomas. Representa a agricultores y ganaderos, siendo clave para la digitalización del sector primario y la trazabilidad de la cadena agroalimentaria.

**FEIQUE**
> Representa al 100% de la industria química española (3.000 empresas). Sector estratégico que genera €71.000M de facturación. Clave para datos de sostenibilidad, compliance y cadena de suministro química.

---

#### Clústeres Empresariales (5)

| ID | Nombre | Nombre Completo | Sector | Status | Prioridad | Iniciativa Clave |
|----|--------|-----------------|--------|--------|-----------|------------------|
| `gaia-cluster` | GAIA | Clúster de Industrias de Conocimiento y Tecnología | Tecnología/Industria 4.0 | en desarrollo | masa_critica | Industria 4.0 España |
| `22-barcelona` | 22@ Barcelona | Distrito de la Innovación 22@ | Smart City/IoT | en desarrollo | inmediato | Innovación urbana |
| `aeropolis` | Aerópolis | Andalucía Aerospace - Parque Tecnológico Aeroespacial | Aeroespacial | próximamente | masa_critica | Andalucía Aerospace |
| `food-i` | Food+i | Clúster Alimentario del Valle del Ebro | Alimentación | próximamente | quick_win | Trazabilidad agroalimentaria |
| `secartys` | Secartys | Clúster de Electrónica, Energía y TIC | Electrónica/Energía | próximamente | quick_win | Eficiencia energética |

**Descripciones Detalladas:**

**GAIA**
> El corazón de la Industria 4.0 en España (País Vasco). Conecta electrónica, informática y telecomunicaciones con la maquinaria herramienta vasca. Hub de digitalización industrial con +300 empresas asociadas.

**22@ Barcelona**
> El distrito de la innovación por excelencia en Cataluña. Concentra empresas de tecnologías de la información, media y energía. Clave para socios en Smart Cities e IoT. Más de 10.000 empresas y 100.000 trabajadores.

**Aerópolis**
> El único parque científico y tecnológico de Europa dedicado exclusivamente a la industria aeroespacial (Andalucía). Vital para datos de certificación y cadena de suministro aeronáutica. Incluye proveedores de Airbus.

**Food+i**
> Clúster alimentario del Valle del Ebro (La Rioja, Navarra, Aragón). Estratégico para vertical agroalimentaria, enfocado en trazabilidad y seguridad alimentaria. Conecta productores, transformadores y distribuidores.

**Secartys**
> Industria de la electrónica, energía solar y domótica a nivel nacional. Interlocutores para datos de eficiencia energética y componentes electrónicos. +300 empresas del sector tecnológico.

---

### 3.2 Alemania 🇩🇪

**Total: 12 partners** (7 asociaciones + 5 clústeres)

#### Asociaciones Sectoriales (7)

| ID | Nombre | Nombre Completo | Sector | Status | Prioridad | Iniciativa Clave |
|----|--------|-----------------|--------|--------|-----------|------------------|
| `bme` | BME | Bundesverband Materialwirtschaft, Einkauf und Logistik | Compras y Logística | en desarrollo | inmediato | BME Symposium, Estándares EU |
| `vda` | VDA | Verband der Automobilindustrie | Automoción | en desarrollo | masa_critica | Estándar VDA, IA en automoción |
| `vci` | VCI | Verband der Chemischen Industrie | Industria Química | próximamente | masa_critica | Sostenibilidad química |
| `zdb` | ZDB | Zentralverband Deutsches Baugewerbe | Construcción | próximamente | quick_win | Digitalización construcción |
| `bdew` | BDEW | Bundesverband der Energie- und Wasserwirtschaft | Energía y Agua | próximamente | masa_critica | Transición energética |
| `wsm` | WSM | Wirtschaftsverband Stahl- und Metallverarbeitung | Metalurgia | próximamente | quick_win | Industria del acero 4.0 |
| `dbv` | DBV | Deutscher Bauernverband | Agricultura | próximamente | quick_win | Agricultura digital |

**Descripciones Detalladas:**

**BME**
> La mayor asociación de gestión de compras de Alemania con +9.500 miembros. Organiza el BME Symposium (mayor evento europeo de procurement) y define los estándares de compras para la industria alemana.

**VDA**
> Asociación de la industria del automóvil alemana. Representa a fabricantes como Volkswagen, BMW, Mercedes-Benz y sus proveedores. Define el estándar VDA para la cadena de suministro automotriz global.

**VCI**
> Representa a la industria química alemana, tercera del mundo. +1.700 empresas miembro incluyendo BASF, Bayer, Henkel. Clave para estándares de sostenibilidad y compliance químico.

**ZDB**
> Federación central de la construcción alemana. Representa a 35.000 empresas constructoras. Impulsa la digitalización (BIM) y la sostenibilidad en el sector de la construcción.

**BDEW**
> Asociación federal de energía y agua. Representa a +1.900 empresas del sector energético alemán. Clave para la transición energética (Energiewende) y datos de consumo.

**WSM**
> Asociación de la industria del acero y procesamiento de metales. Representa a empresas de un sector estratégico para la manufactura europea. Impulsa la Industria 4.0 en metalurgia.

**DBV**
> Federación alemana de agricultores. Representa a +300.000 agricultores. Impulsa la agricultura de precisión y la digitalización del campo alemán.

---

#### Clústeres Empresariales (5)

| ID | Nombre | Nombre Completo | Sector | Status | Prioridad | Iniciativa Clave |
|----|--------|-----------------|--------|--------|-----------|------------------|
| `silicon-saxony` | Silicon Saxony | Clúster de Microelectrónica y Software de Sajonia | Semiconductores | en desarrollo | inmediato | Microelectrónica Europa |
| `its-owl` | it's OWL | Intelligent Technical Systems OstWestfalenLippe | Industria 4.0 | en desarrollo | inmediato | Intelligent Technical Systems |
| `medical-valley` | Medical Valley EMN | Medical Valley Europäische Metropolregion Nürnberg | Tecnología Médica | próximamente | masa_critica | MedTech mundial |
| `hamburg-aviation` | Hamburg Aviation | Clúster de Aviación Civil de Hamburgo | Aeroespacial | próximamente | masa_critica | Aviación civil (Airbus) |
| `biorn` | BioRN | Clúster de Biotecnología Región Rin-Neckar | Biotecnología | próximamente | masa_critica | Ciencias de la vida |

**Descripciones Detalladas:**

**Silicon Saxony**
> El mayor clúster de microelectrónica y software de Europa (Dresde). Aquí están los gigantes de semiconductores (Infineon, Bosch, Globalfoundries). Fundamental para datos de componentes electrónicos críticos. +500 empresas.

**it's OWL**
> Intelligent Technical Systems OstWestfalenLippe. Considerado el hogar de la Industria 4.0. Agrupa a líderes en automatización (Beckhoff, Harting, Phoenix Contact). Si buscas datos de maquinaria conectada, este es el lugar. +200 empresas.

**Medical Valley EMN**
> Uno de los centros mundiales de tecnología médica (Núremberg). Vital para vertical de salud y compras hospitalarias, con estándares de datos extremadamente rigurosos. +500 empresas de MedTech.

**Hamburg Aviation**
> Uno de los mayores clústeres de aviación civil del mundo (sede de Airbus). Controlan toda la cadena de valor: diseño de cabinas, producción y mantenimiento (MRO). +300 empresas aeronáuticas.

**BioRN**
> Clúster de biotecnología y ciencias de la vida (Región Rin-Nectar). Conecta con industria farmacéutica y química (cerca de BASF y Merck), clave para datos de I+D. +150 empresas biotecnológicas.

---

### 3.3 Italia 🇮🇹

**Total: 10 partners** (5 asociaciones + 5 clústeres)

#### Asociaciones Sectoriales (5)

| ID | Nombre | Nombre Completo | Sector | Status | Prioridad | Iniciativa Clave |
|----|--------|-----------------|--------|--------|-----------|------------------|
| `adaci` | ADACI | Associazione Italiana Acquisti e Supply Management | Compras y Supply Chain | en desarrollo | inmediato | Certificación CPSM Italia |
| `anfia` | ANFIA | Associazione Nazionale Filiera Industria Automobilistica | Automoción | próximamente | masa_critica | Transición eléctrica |
| `federchimica` | Federchimica | Federazione Nazionale dell'Industria Chimica | Química | próximamente | masa_critica | Química sostenible |
| `ance` | ANCE | Associazione Nazionale Costruttori Edili | Construcción | próximamente | quick_win | PNRR, construcción verde |
| `federmeccanica` | Federmeccanica | Federazione Sindacale dell'Industria Metalmeccanica Italiana | Metalurgia | próximamente | masa_critica | Metalmecánica 4.0 |

**Descripciones Detalladas:**

**ADACI**
> Asociación italiana de compras y supply management. Referente para la certificación profesional en Italia. Organiza eventos y formación para +5.000 profesionales de compras.

**ANFIA**
> Representa a toda la filiera automotriz italiana: fabricantes, proveedores, carroceros. Clave para la transición hacia vehículos eléctricos y la cadena de suministro automotriz.

**Federchimica**
> Federación de la industria química italiana. Representa a +1.400 empresas del sector. Impulsa la química sostenible y la economía circular.

**ANCE**
> Asociación nacional de constructores. Representa a +20.000 empresas constructoras italianas. Clave para el PNRR (Plan Nacional de Recuperación y Resiliencia) y la construcción verde.

**Federmeccanica**
> Federación de la industria metalmecánica italiana. Representa al sector manufacturero más grande de Italia. Impulsa la transformación digital del sector.

---

#### Clústeres Empresariales (5)

| ID | Nombre | Nombre Completo | Sector | Status | Prioridad | Iniciativa Clave |
|----|--------|-----------------|--------|--------|-----------|------------------|
| `motor-valley` | Motor Valley | Distretto dell'Automotive di Lusso dell'Emilia-Romagna | Automoción Lujo | en desarrollo | masa_critica | Ingeniería de alto rendimiento |
| `packaging-valley` | Packaging Valley | Distretto del Packaging Automatico di Bologna | Maquinaria | en desarrollo | masa_critica | Envasado automático mundial |
| `distretto-ceramica` | Distretto della Ceramica | Distretto Ceramico di Sassuolo | Materiales/Cerámica | próximamente | quick_win | Sostenibilidad y reciclaje |
| `distretto-tessile-prato` | Distretto Tessile di Prato | Distretto Tessile della Toscana | Textil | próximamente | quick_win | Moda circular |
| `aerospace-piedmont` | Aerospace District Piedmont | Distretto Aerospaziale del Piemonte | Aeroespacial | próximamente | masa_critica | Leonardo, Thales Alenia Space |

**Descripciones Detalladas:**

**Motor Valley**
> El clúster automotriz de lujo más famoso del mundo (Emilia-Romaña). Ferrari, Lamborghini, Maserati, Ducati, Pagani. No solo hacen coches, crean el estándar de ingeniería de alto rendimiento. Cadena de suministro de élite con +16.000 empresas.

**Packaging Valley**
> Líder mundial en maquinaria de envasado automático (Bolonia). Nicho industrial gigante donde la digitalización de maquinaria es crítica. Empresas como IMA, Marchesini, Coesia. €8.000M de facturación.

**Distretto della Ceramica**
> Produce el 80% de la cerámica italiana (Sassuolo). Pioneros en sostenibilidad y reciclaje de materiales, generando datos ESG de alto valor. +300 empresas cerámicas.

**Distretto Tessile di Prato**
> Uno de los centros textiles más grandes de Europa (Toscana). Enfoque masivo en 'moda circular' y reciclaje textil, alineado con propuesta de sostenibilidad. +7.000 empresas textiles.

**Aerospace District Piedmont**
> Agrupa actores clave de industria aeroespacial y defensa en norte de Italia (Leonardo, Thales Alenia Space). Complementa al Motor Valley en ingeniería avanzada. +350 empresas.

---

### 3.4 Francia 🇫🇷

**Total: 12 partners** (7 asociaciones + 5 clústeres)

#### Asociaciones Sectoriales (7)

| ID | Nombre | Nombre Completo | Sector | Status | Prioridad | Iniciativa Clave |
|----|--------|-----------------|--------|--------|-----------|------------------|
| `cdaf` | CDAF | Compagnie des Dirigeants et Acheteurs de France | Compras | en desarrollo | inmediato | Nuit des Achats |
| `pfa` | PFA | Plateforme Automobile | Automoción | en desarrollo | masa_critica | Vehículo del futuro |
| `uic` | UIC | Union des Industries Chimiques | Química | próximamente | masa_critica | Química verde |
| `ffb` | FFB | Fédération Française du Bâtiment | Construcción | próximamente | quick_win | RE2020, BIM |
| `ufe` | UFE | Union Française de l'Électricité | Energía Eléctrica | próximamente | masa_critica | Transición energética |
| `fnsea` | FNSEA | Fédération Nationale des Syndicats d'Exploitants Agricoles | Agricultura | próximamente | quick_win | PAC, agricultura digital |
| `fim` | FIM | Fédération des Industries Mécaniques | Maquinaria | próximamente | quick_win | Industria mecánica 4.0 |

**Descripciones Detalladas:**

**CDAF**
> La asociación de directores de compras más influyente de Francia. Organiza "La Nuit des Achats", el evento más prestigioso del sector. +5.000 miembros activos en grandes empresas francesas.

**PFA**
> Plataforma que une a toda la filiera automotriz francesa: constructores (Renault, Stellantis) y proveedores. Lidera la transición hacia el vehículo eléctrico y conectado.

**UIC**
> Unión de industrias químicas francesas. Representa a +400 empresas del sector. Impulsa la química verde y la descarbonización.

**FFB**
> Federación francesa de la construcción. Representa a +50.000 empresas constructoras. Clave para la normativa RE2020 (eficiencia energética) y la digitalización BIM.

**UFE**
> Unión de la electricidad francesa. Representa a productores y distribuidores de electricidad (EDF, Engie). Clave para datos de transición energética.

**FNSEA**
> Mayor sindicato agrícola de Francia. Representa a +200.000 agricultores. Impulsa la digitalización agrícola y la trazabilidad.

**FIM**
> Federación de industrias mecánicas. Representa a +10.000 empresas del sector. Impulsa la Industria 4.0 en manufactura.

---

#### Clústeres Empresariales (5)

| ID | Nombre | Nombre Completo | Sector | Status | Prioridad | Iniciativa Clave |
|----|--------|-----------------|--------|--------|-----------|------------------|
| `aerospace-valley` | Aerospace Valley | Pôle de Compétitivité Aéronautique, Espace et Systèmes Embarqués | Aeroespacial | en desarrollo | inmediato | Mayor clúster aeroespacial mundial |
| `minalogic` | Minalogic | Pôle de Compétitivité des Technologies du Numérique | Semiconductores | en desarrollo | inmediato | Silicon Valley francés |
| `systematic-paris` | Systematic Paris-Region | Pôle de Compétitivité Deep Tech | Deep Tech | próximamente | masa_critica | IA, Ciberseguridad, Gemelos Digitales |
| `capenergies` | Capenergies | Pôle de Compétitivité Énergies Non Génératrices de Gaz à Effet de Serre | Energía | próximamente | masa_critica | Transición energética |
| `biovalley-france` | BioValley France | Pôle de Compétitivité Santé et Biotechnologies Trinational | Biotecnología | próximamente | quick_win | Clúster trinacional salud |

**Descripciones Detalladas:**

**Aerospace Valley**
> El clúster aeroespacial más importante del mundo junto con Seattle (Toulouse/Burdeos). +850 miembros. Socio obligatorio para validar datos de cadena de suministro aeronáutica. Airbus, Safran, Thales.

**Minalogic**
> Polo de innovación en tecnologías digitales: micro-nano electrónica, fotónica, software (Grenoble). Conocido como el 'Silicon Valley francés' para hardware profundo. STMicroelectronics, Soitec. +500 empresas.

**Systematic Paris-Region**
> Enfocado en Deep Tech (IA, Ciberseguridad, Gemelos Digitales). El hub donde las grandes corporaciones francesas desarrollan sus estándares digitales. +900 miembros.

**Capenergies**
> Dedicado a transición energética y energías descarbonizadas (nuclear, solar, hidrógeno) en Provenza-Alpes-Costa Azul. Estratégico para módulo de sostenibilidad energética. +500 miembros.

**BioValley France**
> Clúster trinacional (Alemania y Suiza) de salud y biotecnología en Alsacia. Excelente puerta de entrada para datos farmacéuticos transfronterizos. +350 empresas.

---

### 3.5 Países Bajos 🇳🇱

**Total: 10 partners** (5 asociaciones + 5 clústeres)

#### Asociaciones Sectoriales (5)

| ID | Nombre | Nombre Completo | Sector | Status | Prioridad | Iniciativa Clave |
|----|--------|-----------------|--------|--------|-----------|------------------|
| `nevi` | NEVI | Nederlandse Vereniging voor Inkoopmanagement | Compras | en desarrollo | inmediato | NEVI Inkoopdag |
| `rai` | RAI Vereniging | RAI Vereniging (Automoción) | Automoción | próximamente | quick_win | Movilidad sostenible |
| `vnci` | VNCI | Vereniging van de Nederlandse Chemische Industrie | Química | próximamente | masa_critica | Química circular |
| `bouwend` | Bouwend Nederland | Bouwend Nederland | Construcción | próximamente | quick_win | Construcción circular |
| `lto` | LTO Nederland | Land- en Tuinbouw Organisatie Nederland | Agricultura | próximamente | quick_win | AgriTech, invernaderos |

**Descripciones Detalladas:**

**NEVI**
> Asociación holandesa de gestión de compras. Líder en certificación y formación en procurement. Organiza el NEVI Inkoopdag, evento de referencia. +5.000 miembros.

**RAI Vereniging**
> Asociación de la industria automotriz holandesa. Representa a importadores, distribuidores y fabricantes. Impulsa la movilidad sostenible y eléctrica.

**VNCI**
> Asociación de la industria química holandesa. Representa a +100 empresas del sector. Lidera la transición hacia la química circular.

**Bouwend Nederland**
> Asociación de la construcción holandesa. Representa a +4.500 empresas. Pionera en construcción circular y sostenible.

**LTO Nederland**
> Organización de agricultores y horticultores holandeses. Representa al sector agrícola más tecnificado de Europa. Líder en AgriTech e invernaderos inteligentes.

---

#### Clústeres Empresariales (5)

| ID | Nombre | Nombre Completo | Sector | Status | Prioridad | Iniciativa Clave |
|----|--------|-----------------|--------|--------|-----------|------------------|
| `brainport-eindhoven` | Brainport Eindhoven | Brainport Development - High Tech Campus | Semiconductores | en desarrollo | inmediato | ASML, Philips |
| `food-valley` | Food Valley | Food Valley NL - Wageningen | Alimentación | en desarrollo | inmediato | Estándares globales alimentación |
| `chemelot` | Chemelot | Chemelot Industrial Park | Química/Materiales | próximamente | masa_critica | Economía circular integrada |
| `hague-security-delta` | The Hague Security Delta | HSD - Security Cluster | Seguridad | próximamente | quick_win | Ciberseguridad, forense |
| `port-rotterdam` | Port of Rotterdam / SmartPort | SmartPort - Digital Twin Port | Logística | en desarrollo | inmediato | Digitalización marítima global |

**Descripciones Detalladas:**

**Brainport Eindhoven**
> Probablemente el km² más inteligente de Europa (sede de ASML, Philips, NXP, DAF). Epicentro de la industria de semiconductores y sistemas de alta tecnología. +1.500 empresas tech.

**Food Valley**
> El Silicon Valley de la agricultura y alimentación (Wageningen). Aquí se definen los estándares globales de tecnología alimentaria y proteínas alternativas. Universidad líder mundial en AgriFood.

**Chemelot**
> Parque industrial químico y de materiales ultra-integrado (Limburgo). Ecosistema cerrado donde empresas comparten flujos de energía y datos, perfecto para pilotos de economía circular. DSM, Sabic.

**The Hague Security Delta**
> El clúster de seguridad líder en Europa: ciberseguridad, forense, seguridad nacional (La Haya). Vital para validar la seguridad de la propia plataforma. +300 empresas de seguridad.

**Port of Rotterdam / SmartPort**
> Aunque es un puerto, funciona como clúster logístico y energético masivo. Lideran la digitalización de la cadena de suministro marítima global. Mayor puerto de Europa.

---

### 3.6 Portugal 🇵🇹

**Total: 8 partners** (3 asociaciones + 5 clústeres)

#### Asociaciones Sectoriales (3)

| ID | Nombre | Nombre Completo | Sector | Status | Prioridad | Iniciativa Clave |
|----|--------|-----------------|--------|--------|-----------|------------------|
| `apcadec` | APCADEC | Associação Portuguesa de Compras e Aprovisionamento | Compras | en desarrollo | masa_critica | Digitalización compras |
| `aicep` | AICEP | Agência para o Investimento e Comércio Externo de Portugal | Comercio Exterior | próximamente | quick_win | Internacionalización |
| `aip` | AIP | Associação Industrial Portuguesa | Industria | próximamente | masa_critica | FIL, reindustrialización |

**Descripciones Detalladas:**

**APCADEC**
> Asociación portuguesa de compras y aprovisionamiento. Promueve la profesionalización y digitalización de las compras en Portugal. Referente para formación y certificación.

**AICEP**
> Agencia de inversión y comercio exterior de Portugal. Facilita la internacionalización de empresas portuguesas y la atracción de inversión extranjera. Puerta de entrada al mercado luso.

**AIP**
> Asociación industrial portuguesa. Representa a la industria manufacturera lusa. Organiza la FIL (Feria Internacional de Lisboa). Impulsa la reindustrialización y modernización.

---

#### Clústeres Empresariales (5)

| ID | Nombre | Nombre Completo | Sector | Status | Prioridad | Iniciativa Clave |
|----|--------|-----------------|--------|--------|-----------|------------------|
| `aed-cluster-portugal` | AED Cluster Portugal | Cluster da Aeronáutica, Espaço e Defesa | Aeroespacial | en desarrollo | masa_critica | Proveedor Tier-2 europeo |
| `health-cluster-portugal` | Health Cluster Portugal | Pólo de Competitividade da Saúde | Salud | en desarrollo | masa_critica | Hub salud internacional |
| `produtech` | Produtech | Pólo das Tecnologias de Produção | Maquinaria | próximamente | quick_win | Tecnologías de producción |
| `tice-pt` | TICE.PT | Pólo de Competitividade das TIC | Tecnología | próximamente | quick_win | Paraguas digital Portugal |
| `habitat-sustentavel` | Cluster Habitat Sustentável | Cluster do Habitat Sustentável | Construcción Sostenible | próximamente | quick_win | Materiales sostenibles |

**Descripciones Detalladas:**

**AED Cluster Portugal**
> Aeronáutica, Espacio y Defensa. Unifica la industria lusa de alto valor añadido y crece rápidamente como proveedor Tier-2 europeo. Empresas como Embraer Portugal, OGMA. +130 empresas.

**Health Cluster Portugal**
> Agrupa a la industria farmacéutica, biotecnológica y de dispositivos médicos. Promueve a Portugal como hub de salud internacional. +200 empresas del sector salud.

**Produtech**
> Clúster de tecnologías de producción (Norte). Agrupa a fabricantes de maquinaria y tecnología para industria manufacturera, clave para modernización industrial. +200 empresas.

**TICE.PT**
> El clúster de las Tecnologías de la Información, Comunicación y Electrónica. Es el paraguas digital para la transformación de los demás sectores portugueses. +400 empresas tech.

**Cluster Habitat Sustentável**
> Enfocado en construcción sostenible y materiales (piedra, cerámica, corcho). Promueve sostenibilidad en el entorno construido, muy alineado con datos ESG. +200 empresas.

---

### 3.7 Bélgica 🇧🇪

**Total: 8 partners** (3 asociaciones + 5 clústeres)

#### Asociaciones Sectoriales (3)

| ID | Nombre | Nombre Completo | Sector | Status | Prioridad | Iniciativa Clave |
|----|--------|-----------------|--------|--------|-----------|------------------|
| `agoria` | Agoria | Federatie van de Technologische Industrie | Tecnología Industrial | en desarrollo | inmediato | Industria 4.0 Bélgica |
| `essenscia` | Essenscia | Federatie van de Belgische Chemie en Life Sciences | Química y Life Sciences | próximamente | masa_critica | Química sostenible |
| `febiac` | FEBIAC | Fédération Belge et Luxembourgeoise de l'Automobile | Automoción | próximamente | quick_win | Movilidad electrificada |

**Descripciones Detalladas:**

**Agoria**
> Federación de la industria tecnológica belga. Representa a +2.000 empresas de tecnología, manufactura y servicios digitales. Impulsa la Industria 4.0 en Bélgica.

**Essenscia**
> Federación de química y ciencias de la vida de Bélgica. Representa a un sector que genera €65.000M de exportaciones. Clúster farmacéutico de primer nivel mundial.

**FEBIAC**
> Federación belga y luxemburguesa del automóvil. Representa a importadores y distribuidores. Impulsa la transición hacia movilidad electrificada.

---

#### Clústeres Empresariales (5)

| ID | Nombre | Nombre Completo | Sector | Status | Prioridad | Iniciativa Clave |
|----|--------|-----------------|--------|--------|-----------|------------------|
| `biowin` | BioWin | Pôle de Compétitivité Santé de Wallonie | Biotecnología | en desarrollo | masa_critica | Biofarmacia y vacunas |
| `antwerp-chemical` | Antwerp Chemical Cluster | Port of Antwerp - Chemical Cluster | Química | en desarrollo | inmediato | 2do clúster químico mundial |
| `skywin` | Skywin | Pôle de Compétitivité Aéronautique et Spatial de Wallonie | Aeroespacial | próximamente | masa_critica | Materiales y sistemas embebidos |
| `dsp-valley` | DSP Valley | DSP Valley - Smart Electronic Systems | Electrónica | próximamente | quick_win | Procesamiento de señales |
| `flux50` | Flux50 | Flux50 - Smart Energy Cluster | Energía | próximamente | quick_win | Smart Grids |

**Descripciones Detalladas:**

**BioWin**
> El clúster de salud de Valonia. Referencia europea en biofarmacia y vacunas (GSK, UCB). Agrupa a líderes mundiales y PYMEs innovadoras. +150 empresas biotecnológicas.

**Antwerp Chemical Cluster**
> El segundo clúster químico más grande del mundo después de Houston. El corazón de la industria de procesos en Europa. BASF, Bayer, Total, ExxonMobil. +500 empresas químicas.

**Skywin**
> Clúster aeroespacial valón. Enfocado en nuevos materiales y sistemas embebidos para la aviación. Proveedores de Airbus y Boeing. +130 empresas.

**DSP Valley**
> Especializado en sistemas electrónicos inteligentes y procesamiento de señales (Lovaina). El brazo tecnológico de la región de Flandes. IMEC, NXP. +100 empresas.

**Flux50**
> El clúster de la energía inteligente: Smart Grids, eficiencia energética (Flandes). Socio ideal para integrar datos de consumo energético industrial. +150 empresas.

---

## 4. Distribución por Sector

| Sector | Total | Asociaciones | Clústeres | Países |
|--------|-------|--------------|-----------|--------|
| **Aeroespacial** | 6 | 0 | 6 | ES, DE, FR, IT, BE, PT |
| **Automoción** | 6 | 5 | 1 | DE, IT, FR, NL, BE |
| **Química** | 7 | 5 | 2 | ES, DE, IT, FR, NL, BE |
| **Construcción** | 5 | 4 | 1 | DE, IT, FR, NL, PT |
| **Energía** | 5 | 3 | 2 | DE, FR, BE |
| **Agricultura** | 4 | 4 | 0 | ES, DE, FR, NL |
| **Compras/Procurement** | 7 | 7 | 0 | ES, DE, IT, FR, NL, PT |
| **Semiconductores/Tech** | 6 | 1 | 5 | DE, FR, NL, BE, PT |
| **Biotecnología/Salud** | 6 | 0 | 6 | DE, FR, IT, BE, PT |
| **Alimentación** | 3 | 0 | 3 | ES, NL |
| **Maquinaria** | 4 | 2 | 2 | FR, IT, PT |
| **Metalurgia** | 3 | 3 | 0 | DE, IT |
| **Smart City/IoT** | 2 | 0 | 2 | ES, FR |
| **Logística** | 1 | 0 | 1 | NL |
| **Seguridad** | 1 | 0 | 1 | NL |
| **Textil** | 1 | 0 | 1 | IT |
| **Materiales/Cerámica** | 1 | 0 | 1 | IT |
| **Comercio Exterior** | 1 | 1 | 0 | PT |
| **Industria General** | 2 | 2 | 0 | PT, BE |

---

## 5. Distribución por Prioridad

### Prioridad Inmediata (13 partners - 19%)

Partners para activar en los próximos **0-6 meses**. Máxima prioridad estratégica.

| País | Partner | Tipo | Sector |
|------|---------|------|--------|
| 🇩🇪 | BME | Asociación | Compras |
| 🇩🇪 | Silicon Saxony | Clúster | Semiconductores |
| 🇩🇪 | it's OWL | Clúster | Industria 4.0 |
| 🇮🇹 | ADACI | Asociación | Compras |
| 🇫🇷 | CDAF | Asociación | Compras |
| 🇫🇷 | Aerospace Valley | Clúster | Aeroespacial |
| 🇫🇷 | Minalogic | Clúster | Semiconductores |
| 🇳🇱 | NEVI | Asociación | Compras |
| 🇳🇱 | Brainport Eindhoven | Clúster | Semiconductores |
| 🇳🇱 | Food Valley | Clúster | Alimentación |
| 🇳🇱 | Port of Rotterdam | Clúster | Logística |
| 🇧🇪 | Agoria | Asociación | Tecnología |
| 🇧🇪 | Antwerp Chemical | Clúster | Química |
| 🇪🇸 | 22@ Barcelona | Clúster | Smart City |

### Masa Crítica (22 partners - 31%)

Partners **estructurales** para el ecosistema. Activación en **6-18 meses**.

| País | Partners |
|------|----------|
| 🇪🇸 | AERCE, GAIA, Aerópolis |
| 🇩🇪 | VDA, VCI, BDEW, Medical Valley, Hamburg Aviation, BioRN |
| 🇮🇹 | ANFIA, Federchimica, Federmeccanica, Motor Valley, Packaging Valley, Aerospace Piedmont |
| 🇫🇷 | PFA, UIC, UFE, Systematic Paris, Capenergies |
| 🇳🇱 | VNCI, Chemelot |
| 🇵🇹 | APCADEC, AIP, AED Cluster, Health Cluster |
| 🇧🇪 | Essenscia, BioWin, Skywin |

### Quick Win (16 partners - 23%)

**Victorias rápidas** con bajo esfuerzo y alto impacto. Activación oportunista.

| País | Partners |
|------|----------|
| 🇪🇸 | BME España, ASAJA, FEIQUE, Food+i, Secartys |
| 🇩🇪 | ZDB, WSM, DBV |
| 🇮🇹 | ANCE, Distretto Ceramica, Distretto Tessile |
| 🇫🇷 | FFB, FNSEA, FIM, BioValley France |
| 🇳🇱 | RAI, Bouwend Nederland, LTO, Hague Security |
| 🇵🇹 | AICEP, Produtech, TICE.PT, Habitat Sustentável |
| 🇧🇪 | FEBIAC, DSP Valley, Flux50 |

### Sin Prioridad Definida (19 partners - 27%)

Partners en **evaluación** o con baja prioridad actual.

---

## 6. Sistema de Iconografía

### Mapeo Sector → Icono Lucide

```typescript
const sectorIconMap: Record<string, string> = {
  // Tecnología y Electrónica
  "Semiconductores": "Cpu",
  "Tecnología": "Cpu",
  "Electrónica": "Cpu",
  "Tecnología/Industria 4.0": "Cpu",
  "Tecnología Industrial": "Cpu",
  
  // Aeroespacial
  "Aeroespacial": "Plane",
  
  // Salud y Biotecnología
  "Biotecnología": "HeartPulse",
  "Tecnología Médica": "HeartPulse",
  "Salud": "HeartPulse",
  
  // Logística y Transporte
  "Logística": "Ship",
  
  // Smart City y Deep Tech
  "Smart City/IoT": "Network",
  "Deep Tech": "Network",
  
  // Seguridad
  "Seguridad": "Shield",
  
  // Textil
  "Textil": "Shirt",
  
  // Alimentación
  "Alimentación": "UtensilsCrossed",
  
  // Materiales
  "Materiales/Cerámica": "Boxes",
  "Química/Materiales": "Boxes",
  
  // Industria y Maquinaria
  "Industria 4.0": "Factory",
  "Maquinaria": "Factory",
  
  // Automoción
  "Automoción": "Car",
  "Automoción Lujo": "Car",
  
  // Energía
  "Energía": "Zap",
  "Energía Eléctrica": "Zap",
  "Energía y Agua": "Zap",
  "Electrónica/Energía": "Zap",
  
  // Construcción
  "Construcción": "Building",
  "Construcción Sostenible": "Building",
  
  // Sector Público
  "Sector Público": "Database",
  
  // Compras
  "Compras": "ShoppingCart",
  "Compras Profesionales": "ShoppingCart",
  "Compras y Logística": "ShoppingCart",
  "Compras y Supply Chain": "ShoppingCart",
  
  // Agricultura
  "Agricultura": "Wheat",
  
  // Química
  "Química": "FlaskConical",
  "Química y Life Sciences": "FlaskConical",
  
  // Metalurgia
  "Metalurgia": "Cog",
  
  // Comercio
  "Comercio Exterior": "Globe",
  
  // Industria General
  "Industria": "Factory",
};
```

### Implementación React

```tsx
import { 
  Cpu, Plane, HeartPulse, Ship, Network, Shield, Shirt, 
  UtensilsCrossed, Boxes, Factory, Car, Zap, Building, 
  Database, ShoppingCart, Wheat, FlaskConical, Cog, Globe, Monitor 
} from "lucide-react";

const getSectorIcon = (sector: string) => {
  const lowerSector = sector.toLowerCase();
  
  if (lowerSector.includes("semicon") || lowerSector.includes("tech") || lowerSector.includes("electrón")) {
    return <Cpu className="h-3 w-3" />;
  }
  if (lowerSector.includes("aero") || lowerSector.includes("aviación") || lowerSector.includes("espacio")) {
    return <Plane className="h-3 w-3" />;
  }
  // ... etc
  
  return <Monitor className="h-3 w-3" />; // Default
};
```

---

## 7. Sistema de Badges y Estados

### Estados de Partner

| Status | Label | Colores Tailwind |
|--------|-------|------------------|
| `activo` | "Activo" | `bg-green-500/10 text-green-600 border-green-500/20` |
| `en desarrollo` | "En Desarrollo" | `bg-blue-500/10 text-blue-600 border-blue-500/20` |
| `próximamente` | "Próximamente" | `bg-amber-500/10 text-amber-600 border-amber-500/20` |

```tsx
const getStatusBadge = (status: Partner["status"]) => {
  switch (status) {
    case "activo":
      return (
        <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
          Activo
        </Badge>
      );
    case "en desarrollo":
      return (
        <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 border-blue-500/20">
          En Desarrollo
        </Badge>
      );
    case "próximamente":
      return (
        <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 border-amber-500/20">
          Próximamente
        </Badge>
      );
  }
};
```

### Badges de Prioridad

| Prioridad | Label | Icono | Colores Tailwind |
|-----------|-------|-------|------------------|
| `inmediato` | "Inmediato" | Target | `bg-emerald-500/10 text-emerald-600 border-emerald-500/30` |
| `masa_critica` | "Masa Crítica" | Factory | `bg-blue-500/10 text-blue-600 border-blue-500/30` |
| `quick_win` | "Quick Win" | Bolt | `bg-orange-500/10 text-orange-600 border-orange-500/30` |

```tsx
const getPriorityBadge = (priority?: Partner["priority"]) => {
  if (!priority) return null;
  
  switch (priority) {
    case "inmediato":
      return (
        <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
          <Target className="h-3 w-3 mr-1" />
          Inmediato
        </Badge>
      );
    case "masa_critica":
      return (
        <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 border-blue-500/30">
          <Factory className="h-3 w-3 mr-1" />
          Masa Crítica
        </Badge>
      );
    case "quick_win":
      return (
        <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-600 border-orange-500/30">
          <Bolt className="h-3 w-3 mr-1" />
          Quick Win
        </Badge>
      );
  }
};
```

### Badge de Tipo

| Tipo | Label | Icono | Colores Tailwind |
|------|-------|-------|------------------|
| `clúster` | "Clúster" | Sparkles | `bg-purple-500/10 text-purple-600 border-purple-500/30` |

```tsx
const getTypeBadge = (type?: Partner["type"]) => {
  if (type === "clúster") {
    return (
      <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-600 border-purple-500/30">
        <Sparkles className="h-3 w-3 mr-1" />
        Clúster
      </Badge>
    );
  }
  return null;
};
```

---

## 8. Datos JSON Exportables

### Estructura Completa

```json
{
  "metadata": {
    "version": "1.0",
    "date": "2026-01-10",
    "totalPartners": 70,
    "countries": 7,
    "associations": 35,
    "clusters": 35
  },
  "countries": [
    {
      "name": "España",
      "flag": "🇪🇸",
      "code": "ES",
      "partners": [
        {
          "id": "itbid",
          "name": "ITBID",
          "fullName": null,
          "description": "Plataforma líder de licitaciones públicas en España...",
          "logo": null,
          "link": "/partners/itbid/proyecto",
          "status": "activo",
          "sector": "Sector Público",
          "hasDocTecnico": true,
          "keyInitiative": null,
          "priority": null,
          "type": "asociación"
        }
        // ... más partners
      ]
    }
    // ... más países
  ]
}
```

### Archivo TypeScript Exportable

El archivo `src/data/partnersData.ts` contiene la definición completa y puede ser copiado directamente a otro proyecto:

```typescript
// src/data/partnersData.ts

export interface Partner {
  id: string;
  name: string;
  fullName?: string;
  description: string;
  logo: string | null;
  link: string;
  status: "activo" | "próximamente" | "en desarrollo";
  sector: string;
  hasDocTecnico?: boolean;
  keyInitiative?: string;
  priority?: "inmediato" | "masa_critica" | "quick_win";
  type?: "asociación" | "clúster";
}

export interface CountryData {
  name: string;
  flag: string;
  partners: Partner[];
}

export const partnersByCountry: CountryData[] = [
  // ... datos completos
];
```

---

## 9. Notas de Implementación

### Estructura de Archivos

```
src/
├── data/
│   └── partnersData.ts          # Datos de partners (exportable)
├── pages/
│   └── Partners.tsx             # Página principal
├── components/
│   └── SectorIcon.tsx           # Iconos por sector (opcional)
```

### Dependencias Requeridas

```json
{
  "dependencies": {
    "lucide-react": "^0.462.0",
    "react": "^18.3.1",
    "react-router-dom": "^6.30.1",
    "tailwindcss": "^3.x"
  }
}
```

### Componentes UI Utilizados

- `Badge` - Componente de badge (shadcn/ui)
- `Card`, `CardHeader`, `CardContent` - Componentes de tarjeta (shadcn/ui)
- `Button` - Componente de botón (shadcn/ui)

### Rutas Internas

| Partner | Ruta |
|---------|------|
| ITBID | `/partners/itbid/proyecto` |
| Otros | `/partners` (sin ruta específica aún) |

### Pasos para Replicar

1. **Copiar datos**: Copiar `src/data/partnersData.ts` al nuevo proyecto
2. **Instalar dependencias**: `npm install lucide-react`
3. **Crear página**: Crear componente `Partners.tsx` con la lógica de renderizado
4. **Configurar rutas**: Añadir ruta `/partners` en el router
5. **Estilos**: Asegurar que Tailwind CSS está configurado con los colores utilizados
6. **Componentes UI**: Instalar o crear componentes Badge, Card, Button

---

## Historial de Cambios

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | 2026-01-10 | Versión inicial con 70 partners |

---

## Licencia y Uso

Este documento y los datos asociados son propiedad de PROCUREDATA. 
El uso de esta información está sujeto a los términos de colaboración establecidos.

---

*Documento generado automáticamente desde el código fuente de PROCUREDATA.*
*Última actualización: 2026-01-10*
