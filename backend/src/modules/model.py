import spacy
from spacy.tokens import DocBin
from spacy.tokens import Span
from modules.parameters import parameters


class Model:
    nlp = spacy.load("src/modules/model-best")

async def evaluate(eval: str) -> str:
    doc = Model.nlp(eval)
    entities = [span.text for span in doc.ents]
    entities_string = ', '.join(entities)
    return entities_string

#To use model:
#doc = nlp_ner("Use code CRAZYDEAL2020 on Postmates for $15 off!!!")
#doc.ents