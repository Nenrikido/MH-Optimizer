import os
from typing import Any


DATA_NAME_KEY_ALIASES = {
    # pt-BR can fall back to pt if regional key is unavailable in DB data.
    'pt-BR': 'pt',
    # es-419 can fall back to es when regional key is unavailable.
    'es-419': 'es',
}


def _normalize_language_input(value: str | None) -> str:
    if not value:
        return ''
    return value.strip().replace('_', '-')


def _parse_supported_languages(raw: str) -> list[str]:
    values = [_normalize_language_input(part) for part in raw.split(',') if part.strip()]
    if 'en' not in values:
        values.insert(0, 'en')
    deduped: list[str] = []
    for value in values:
        if value not in deduped:
            deduped.append(value)
    return deduped or ['en']


SUPPORTED_LANGUAGES = _parse_supported_languages(
    os.getenv('MHOPTI_SUPPORTED_LANGUAGES', 'en,fr,de,es,es-419,pt,pt-BR,it,pl')
)

_DEFAULT_LANGUAGE = _normalize_language_input(os.getenv('MHOPTI_DEFAULT_LANGUAGE', 'en'))
DEFAULT_LANGUAGE = _DEFAULT_LANGUAGE if _DEFAULT_LANGUAGE in SUPPORTED_LANGUAGES else SUPPORTED_LANGUAGES[0]


def normalize_language(value: str | None) -> str:
    if not value:
        return DEFAULT_LANGUAGE
    normalized = _normalize_language_input(value)
    if not normalized:
        return DEFAULT_LANGUAGE
    if normalized in SUPPORTED_LANGUAGES:
        return normalized

    lowered = normalized.lower()
    for supported in SUPPORTED_LANGUAGES:
        if supported.lower() == lowered:
            return supported

    return DEFAULT_LANGUAGE


def extract_request_language(req, payload: dict[str, Any] | None = None) -> str:
    body_lang = None
    if isinstance(payload, dict):
        body_lang = payload.get('language') or payload.get('lang')

    query_lang = req.args.get('language') or req.args.get('lang')
    if body_lang:
        return normalize_language(str(body_lang))
    if query_lang:
        return normalize_language(query_lang)

    accept_language = req.headers.get('Accept-Language', '')
    for chunk in accept_language.split(','):
        candidate = chunk.split(';', 1)[0].strip()
        if candidate:
            normalized = normalize_language(candidate)
            if normalized in SUPPORTED_LANGUAGES:
                return normalized

    return DEFAULT_LANGUAGE


def localize_names(entry: dict[str, Any] | None) -> dict[str, str]:
    entry = entry or {}
    raw_names = entry.get('names', {})
    if not isinstance(raw_names, dict):
        raw_names = {}
    names = {str(k): str(v) for k, v in raw_names.items()}
    names_lower = {str(k).lower(): str(v) for k, v in raw_names.items()}

    def _name_value(key: str) -> str:
        return names.get(key) or names_lower.get(key.lower(), '')

    fallback_key = DATA_NAME_KEY_ALIASES.get(DEFAULT_LANGUAGE, DEFAULT_LANGUAGE)
    fallback = str(_name_value(fallback_key) or _name_value(DEFAULT_LANGUAGE) or entry.get('name') or '')

    localized = {}
    for lang in SUPPORTED_LANGUAGES:
        data_key = DATA_NAME_KEY_ALIASES.get(lang, lang)
        localized[lang] = str(_name_value(data_key) or _name_value(lang) or fallback)

    if 'en' not in localized:
        localized['en'] = fallback

    return localized


def iter_entry_name_values(entry: dict[str, Any] | None):
    seen = set()
    for value in localize_names(entry).values():
        if value and value not in seen:
            seen.add(value)
            yield value

    if isinstance(entry, dict):
        raw_name = entry.get('name')
        if raw_name and raw_name not in seen:
            yield str(raw_name)


def build_name_to_id(entries: list[dict[str, Any]]) -> dict[str, str]:
    mapping: dict[str, str] = {}
    for entry in entries:
        entry_id = str(entry.get('id', ''))
        if not entry_id:
            continue
        for name in iter_entry_name_values(entry):
            mapping[name] = entry_id
    return mapping

