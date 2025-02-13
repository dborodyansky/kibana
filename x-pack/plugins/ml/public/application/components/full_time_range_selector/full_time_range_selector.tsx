/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { FC } from 'react';

import { FormattedMessage } from '@kbn/i18n-react';
import type { Query } from 'src/plugins/data/public';
import { EuiButton } from '@elastic/eui';
import type { DataView } from '../../../../../../../src/plugins/data_views/public';
import { setFullTimeRange } from './full_time_range_selector_service';

interface Props {
  dataView: DataView;
  query: Query;
  disabled: boolean;
  callback?: (a: any) => void;
}

// Component for rendering a button which automatically sets the range of the time filter
// to the time range of data in the index(es) mapped to the supplied Kibana index pattern or query.
export const FullTimeRangeSelector: FC<Props> = ({ dataView, query, disabled, callback }) => {
  // wrapper around setFullTimeRange to allow for the calling of the optional callBack prop
  async function setRange(i: DataView, q: Query) {
    const fullTimeRange = await setFullTimeRange(i, q);
    if (typeof callback === 'function') {
      callback(fullTimeRange);
    }
  }
  return (
    <EuiButton
      isDisabled={disabled}
      onClick={() => setRange(dataView, query)}
      data-test-subj="mlButtonUseFullData"
    >
      <FormattedMessage
        id="xpack.ml.fullTimeRangeSelector.useFullDataButtonLabel"
        defaultMessage="Use full {dataViewTitle} data"
        values={{
          dataViewTitle: dataView.title,
        }}
      />
    </EuiButton>
  );
};
