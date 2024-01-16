import React from 'react'
import { Row, Col, Card } from 'antd'

export default function StatisticCard({totalDonations, totalDonationSum, maxDonation, ...props}) {
  return (
    <div className='stats-card'>
      <Row gutter={16}>
        <Col span={12}>
            <Card title="Total No Donations" bordered={false}>
            {totalDonations}
            </Card>
        </Col>
        <Col span={12}>
            <Card title="Total Sum of Donations" bordered={false}>
            {totalDonationSum}
            </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
            <Card title="Max Donation" bordered={false}>
            `{maxDonation ? 'Donation done by ' + maxDonation?.name +' with amount '+ maxDonation?.amount : 'NA'}`
            </Card>
        </Col>
      </Row>
    </div>
  )
}
