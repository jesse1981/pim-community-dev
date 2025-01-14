<?php

namespace Akeneo\Pim\Enrichment\Component\Product\Factory;

use Akeneo\Pim\Enrichment\Component\Product\Model\WriteValueCollection;

/**
 * @author    Anael Chardan <anael.chardan@akeneo.com>
 * @copyright 2019 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
class WriteValueCollectionFactory
{
    /** @var ValueCollectionFactory */
    private $valueCollectionFactory;

    public function __construct(
        ValueCollectionFactory $valueCollectionFactory
    ) {
        $this->valueCollectionFactory = $valueCollectionFactory;
    }

    public function createFromStorageFormat(array $rawValues): WriteValueCollection
    {
        $valueCollection = $this->valueCollectionFactory->createFromStorageFormat($rawValues);

        return WriteValueCollection::fromReadValueCollection($valueCollection);
    }

    public function createMultipleFromStorageFormat(array $rawValueCollections): array
    {
        $valueCollectionsList = $this->valueCollectionFactory->createMultipleFromStorageFormat($rawValueCollections);

        $writeValueCollectionList = [];
        foreach ($valueCollectionsList as $identifier => $valueCollection) {
            $writeValueCollectionList[$identifier] = WriteValueCollection::fromReadValueCollection($valueCollection);
        }

        return $writeValueCollectionList;
    }
}
